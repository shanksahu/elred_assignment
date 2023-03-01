const otpTemplate = (otp) => {
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
      
        <body
          style="
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
              'Segoe UI Symbol';
            -webkit-text-size-adjust: none;
            background-color: #ffffff;
            color: #718096;
            height: 100%;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            width: 100% !important;
          "
        >
          <style>
            .wrapper {
              background-color: #f14d5d !important;
              margin: 0 auto !important;
              padding: 0 !important;
              width: 570px !important;
            }
            p {
              position: relative;
              font-size: 16px;
              line-height: 1.5em;
              margin-top: 0;
              text-align: left;
            }
      
            @media only screen and (max-width: 600px) {
              .inner-body {
                width: 100% !important;
              }
              .footer {
                width: 100% !important;
              }
            }
            @media only screen and (max-width: 500px) {
              .button {
                width: 100% !important;
              }
            }
          </style>
          <table
            cellpadding="0"
            cellspacing="0"
            class="wrapper"
            width="100%"
            style="background-color: #f14d5d"
          >
            <tr>
              <td class="header" style="padding: 20px 0; text-align: center">
                <a
                  style="
                    color: #ffffff;
                    font-size: 20px;
                    font-weight: bold;
                    text-decoration: none;
                    display: inline-block;
                  "
                >
                  <p style="margin: 0">ELRED</p>
                </a>
              </td>
            </tr>
            <tr style="background-color: #ffffff">
              <td class="content-cell" style="max-width: 100vw; padding: 32px">
                <h1
                  style="
                    color: #3d4852;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 0;
                  "
                >
                  Dear User,
                </h1>
                <p>
                  YOUR OTP IS ${otp},
                  Please do nt share with any one!
                  This OTP will expire in 3 Mins and can be only used once.
                  <br /><br />
                 
                </p>
                <p style="margin: 0">Thank you</p>
                <p>elred</p>
              </td>
            </tr>
            <tr class="footer" width="570" cellpadding="0" cellspacing="0">
              <td>
                <p
                  style="
                    color: #fff !important;
                    text-align: center;
                    font-size: 12px;
                    padding: 30px 0;
                    margin: 0;
                  "
                >
                  @elred.All Rights Reserved.
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
      `
    return html
}

module.exports = { otpTemplate }