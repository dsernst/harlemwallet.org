import sgMail from '@sendgrid/mail'

const { SENDGRID_API_KEY } = process.env

if (!SENDGRID_API_KEY) {
  console.error('Please set the SENDGRID_API_KEY environment variable')
  process.exit(1)
}
sgMail.setApiKey(SENDGRID_API_KEY)

export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) =>
  sgMail
    .send({
      to,
      from: 'support@harlemwallet.org',
      subject,
      //   text: 'and easy to do anywhere, even with Node.js',
      html: body,
    })
    .then(() => console.log(`Sent email '${subject}' to ${to}`))
    .catch(console.error)
