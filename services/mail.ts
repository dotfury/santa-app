const nodemailer = require('nodemailer');

type Mail = { username: string; address: string; wish: string; }
type MailHeader = { from: string; to: string; subject: string; }

const TIME_INTERVAL = 15000;
let mailCache: Mail[] = [];
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'rollin.quigley56@ethereal.email',
    pass: '9Xc2QAkhJ7zkgtFbbY'
  }
});

const addMailToCache = (mail: Mail): void => {
  mailCache.push(mail);
};

const clearMailCache = (): void => {
  mailCache = [];
}

const createHeader = (): MailHeader => ({
  from: 'do_not_reply@northpole.com',
  to: 'santa@northpole.com',
  subject: 'My Wishes!',
});

const createMessage = (): string => {
  const wishes = mailCache.map(mail => {
    return `
      ${mail.username}
      ${mail.address}
      ${mail.wish}
      `
  }).join('\n\n');
  
  clearMailCache();
  
  return `
  Dear Santa,

      We have received more wishes:

      ${wishes}
      
      Good luck.
  `;
};

const sendMail = (): void => {
  if (mailCache.length === 0) return;
  
   try {
    const message = { ...createHeader(), text: createMessage() };
    
     transporter.sendMail(message);
  } catch(e) {
      console.log(e);
  }
};

const startMailTimer = ():void => {
  setInterval(()=> {
    sendMail();
  }, TIME_INTERVAL);
}
  
module.exports = {
  addMailToCache,
  startMailTimer
};
