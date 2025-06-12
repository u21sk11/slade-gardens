import type { CustomMessageTriggerHandler } from "aws-lambda";

const template = (code: string, type: string): string => {
    let line1 = "Welcome to the Slade Gardens Community Play Association! We just need to confirm your email address before you’re all set.";
    let line2 = "Simply enter this code on the verification page to complete your registration. Thank you for joining our community, where we work together to empower young people and make a difference.";
    
    if(type === "reset"){
        line1 = "We received a request to reset your password.";
        line2 = "Simply enter this code on the password reset page to complete the processs. Thank you for joining our community, where we work together to empower young people and make a difference.";
    }

    return `<html>
        <body style="background-color:#333; font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif; ">
            <div style="margin: 0 auto; width: 600px; background-color: #fff; font-size: 1.2rem; font-style: normal;font-weight: normal;line-height: 19px;" align="center">
                <div style="padding: 20;">
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <img style="border: 0;display: block;height: auto; width: 30%;max-width: 373px;" alt="Animage" height="200" width="300"  src="https://sladeadventure.co.uk/wp-content/uploads/2019/07/slade-gardens-logo-no-bg.png" />
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <h2 style="font-size: 28px; margin-top: 20px; margin-bottom: 0;font-style: normal; font-weight: bold; color: #000;font-size: 24px;line-height: 32px;text-align: center;">Hi</h2>
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">${line1}</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">Here’s your confirmation code: <strong>${code}</strong></p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">${line2}</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;">&nbsp;</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">If you weren’t expecting this email or something doesn’t seem quite right, please report it to <strong>sladeadventure@btinternet.com</strong></p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">Warm regards,</p>
                    <p style="Margin-top: 20px;Margin-bottom: 0;font-size: 16px;line-height: 24px; color: #000">The Slade Gardens Team</p>
                </div>
            </div>
        </body>
    </html>`;
}
    

export const handler: CustomMessageTriggerHandler = async (event) => {
  if (event.triggerSource === "CustomMessage_SignUp") {
    event.response.emailSubject = "Confirmation Code | Slade Gardens Community Play Association";
    event.response.emailMessage = template(event.request.codeParameter, "base");
  } else if (event.triggerSource === "CustomMessage_ResendCode"){
    event.response.emailSubject = "Resent Confirmation Code | Slade Gardens Community Play Association";
    event.response.emailMessage = template(event.request.codeParameter, "base");
  }
  else if(event.triggerSource === "CustomMessage_ForgotPassword") {
    event.response.emailSubject = "Password Reset Confirmation Code | Slade Gardens Community Play Association";
    event.response.emailMessage = template(event.request.codeParameter, "reset");
  }

  return event;
};