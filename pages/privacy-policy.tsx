import type { NextPage } from 'next'
import Head from 'next/head'

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div className="absolute inset-0 min-h-screen py-2 overflow-scroll from-white to-gray-100 bg-gradient-to-br">
      <Head>
        <title>Harlem Wallet - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full max-w-3xl p-6 mx-auto">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center">
          Harlem Wallet Privacy Policy
        </h1>

        {/* Intro section */}
        <div className="mt-5 space-y-6">
          <p>
            <b>Last Modified:</b> February 1, 2023
          </p>
          <p>
            Our goal to be transparent about our use of your information so
            please read this statement carefully. If you do not agree with the
            following practices, your choice is not to use our Website or
            participate in this project.
          </p>
          <h3 className="font-semibold">Information We Collect About You</h3>
          We will collect your name, mailing address, and IP address. We collect
          this information directly from you or from your device as you navigate
          the Website.
          <h3 className="font-semibold">How We Use Your Information</h3>
          We will use your information exclusively to facilitate your
          participation in this project. We will not use your information for
          any other purpose.
          <h3 className="font-semibold">Disclosure of Your Information</h3>
          We will not sell or rent your personal information to any outside
          party, for any purpose. Period. We may, however, share information
          about our Website’s visitors with essential third-party service
          providers who are necessary for maintaining our Website. We will also
          share your mailing address with a third-party service to effectuate
          our mailing of the unique feedback link by postcard.
          <h3 className="font-semibold">Retention of Your Information</h3>
          We will permanently delete your personal information or render it
          completely anonymized once this project is complete.
          <h3 className="font-semibold">Citizens Under the Age of 18</h3>
          Our Website is not intended for citizens under 18 years of age.
          Accordingly, we do not knowingly collect personal information from
          citizens under 18. If you are under 18, do not use or provide any
          information on this Website.
        </div>
      </main>
    </div>
  )
}

export default PrivacyPolicyPage
