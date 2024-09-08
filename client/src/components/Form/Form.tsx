import { useState, useRef } from 'react';
import axios from 'axios';

import validateUser from '../../utils/user';
import { statuses } from '../../utils/constants';

export default function Form({ onAppState }: { onAppState: Function }) {
  const [userName, setUserName] = useState<string>('');
  const wishRef = useRef<HTMLTextAreaElement>(null);
  const wishForm = useRef<HTMLFormElement>(null);

  const submitForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const wishContent = wishRef.current?.value;

    if (wishContent) {
      if (wishContent.length > 100) {
        alert('Please keep wishes to a maximum of 100 characters.');
        return;
      }

      const validation = await validateUser(userName);

      if (validation.status === statuses.SUCCESS) {
        axios.post('http://localhost:3000', {
          userid: userName,
          wish: wishContent,
          address: validation.address
        })
        .then(function (response) {
          if (response.data.redirect) {
            window.location = response.data.redirect;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      } else {
        onAppState(validation.message)
      }
    }
  }

  const onChangeName = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserName(e.currentTarget.value);
  }

  return (
    <form
      ref={ wishForm }
      onSubmit={ submitForm }
      method="post"
      action="http://localhost:3000"
      >
      <label htmlFor="name">
        who are you?
        <input 
          id="userid" 
          type="text" 
          placeholder="charlie.brown" 
          name="userid"
          value={ userName }
          onChange={ onChangeName }
          required
        />
      </label>
      <label htmlFor="message">what do you want for christmas?</label>
      <textarea
        ref={ wishRef }
        id="wish"
        name="wish"
        rows={ 10 }
        cols={ 45 }
        maxLength={ 100 }
        placeholder="Gifts!"
        required
      />
      <button>Send</button>
    </form>
  );
}