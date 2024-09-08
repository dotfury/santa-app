var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require('typescript-require');
var axios = require('axios');
var _a = require('../constants.ts'), messages = _a.messages, statuses = _a.statuses;
var MAX_AGE = 10;
var YEAR_IN_MS = 3.15576e+10;
var getUsers = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getUserProfiles = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json')];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getAge = function (birthDate) { return Math.floor((new Date() - new Date(birthDate).getTime()) / YEAR_IN_MS); };
var isValidDate = function (date) { return !isNaN(new Date(date)); };
var isUserAgeValid = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    var userProfiles, profile, birthdate, address, isValid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserProfiles()];
            case 1:
                userProfiles = _a.sent();
                profile = userProfiles.data.find(function (up) { return up.userUid === userId; });
                birthdate = profile.birthdate, address = profile.address;
                isValid = isValidDate(birthdate) && (getAge(birthdate) < MAX_AGE);
                if (isValid) {
                    return [2 /*return*/, { address: address }];
                }
                else {
                    return [2 /*return*/, { address: null }];
                }
                return [2 /*return*/];
        }
    });
}); };
var isUserRegistered = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    var registeredUsers, currentUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUsers()];
            case 1:
                registeredUsers = _a.sent();
                currentUser = registeredUsers.data.find(function (u) { return u.username === userId; });
                return [2 /*return*/, currentUser];
        }
    });
}); };
var validateUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
    var user, ageValidationProfile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, isUserRegistered(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { status: statuses.FAILURE, message: messages.NO_USER }];
                }
                return [4 /*yield*/, isUserAgeValid(user.uid)];
            case 2:
                ageValidationProfile = _a.sent();
                if (ageValidationProfile.address == null) {
                    return [2 /*return*/, { status: statuses.FAILURE, message: messages.BAD_AGE }];
                }
                return [2 /*return*/, { status: statuses.SUCCESS, message: messages.OK, address: ageValidationProfile.address }];
        }
    });
}); };
module.exports = {
    validateUser: validateUser
};
