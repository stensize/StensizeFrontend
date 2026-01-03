// https://www.npmjs.com/package/zeptomail

// For ES6
import { SendMailClient } from "zeptomail";

// For CommonJS
// var { SendMailClient } = require("zeptomail");

const url = "https://api.zeptomail.in/v1.1/email";
const token = "Zoho-enczapikey ********";

let client = new SendMailClient({url, token});

client.sendMail({
    "from": 
    {
        "address": "noreply@stensize.com",
        "name": "noreply"
    },
    "to": 
    [
        {
        "email_address": 
            {
                "address": "support@stensize.com",
                "name": "Stensize Support"
            }
        }
    ],
    "subject": "Test Email",
    "htmlbody": "<div><b> Test email sent successfully.</b></div>",
}).then((resp) => console.log("success")).catch((error) => console.log("error"));