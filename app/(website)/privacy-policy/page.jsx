import { sansation } from "@/app/Utils/font";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className={`py-10 px-[4vw] text-grey ${sansation.className}`}>
      <h1 className="text-brown text-2xl font-bold">Privacy Policy</h1>
      <div className="px-2 md:px-4 mt-2">
        <p className="mb-2">
          This privacy policy (“Policy”) relates to the manner SAROJ SURIN
          RATHORE (“we”, “us”, “our”) in which we use, handle and process the
          data that you provide us in connection with using the products or
          services we offer. By using this website or by availing goods or
          services offered by us, you agree to the terms and conditions of this
          Policy, and consent to our use, storage, disclosure, and transfer of
          your information or data in the manner described in this Policy.
        </p>
        <p className="mb-2">
          We are committed to ensuring that your privacy is protected in
          accordance with applicable laws and regulations. We urge you to
          acquaint yourself with this Policy to familiarize yourself with the
          manner in which your data is being handled by us.
        </p>
        <p className="mb-4">
          SAROJ SURIN RATHORE may change this Policy periodically and we urge
          you to check this page for the latest version of the Policy in order
          to keep yourself updated.
        </p>
        <div className="mb-2">
          <h1 className="text-lg text-brown font-semibold">
            What data is being collected
          </h1>
          <div className="px-4">
            <p>We may collect the following information from you:</p>
            {[
              "Name",
              "Contact information including address and email address",
              "Demographic information or, preferences or interests",
              "Personal Data or Other information relevant/ required for providing the goods or services to you",
              "The meaning of Personal Data will be as defined under relevant Indian laws",
            ].map((e) => {
              return <li key={e}>{e}</li>;
            })}
          </div>
        </div>
        <p className="mb-4">
          <span className="text-brown">Note:</span> Notwithstanding anything
          under this Policy as required under applicable Indian laws, we will
          not be storing any credit card, debit card or any other similar card
          data of yours. Please also note that all data or information collected
          from you will be strictly in accordance with applicable laws and
          guidelines.
        </p>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            What we do with the data we gather
          </h1>
          <div className="px-4">
            <p>
              We require this data to provide you with the goods or services
              offered by us including but not limited, for the below set out
              purposes:
            </p>
            {[
              "Internal record keeping.",
              "For improving our products or services.",
              "For providing updates to you regarding our products or services including any special offers.",
              "To communicate information to you",
              "For internal training and quality assurance purposes",
            ].map((e) => {
              return <li key={e}>{e}</li>;
            })}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            Who do we share your data with
          </h1>
          <div className="px-4">
            <p>We may share your information or data with:</p>
            {[
              "Third parties including our service providers in order to facilitate the provisions of goods or services to you, carry out your requests, respond to your queries, fulfil your orders or for other operational and business reasons.",
              "With our group companies (to the extent relevant)",
              "Our auditors or advisors to the extent required by them for performing their services",
              "Governmental bodies, regulatory authorities, law enforcement authorities pursuant to our legal obligations or compliance requirements.",
            ].map((e) => {
              return <li key={e}>{e}</li>;
            })}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            How we use cookie
          </h1>
          <div className="px-4">
            We use "cookies" to collect information and to better understand
            customer behaviour. You can instruct your browser to refuse all
            cookies or to indicate when a cookie is being sent. However, if you
            do not accept cookies, you may not be able to avail our goods or
            services to the full extent. We do not control the use of cookies by
            third parties. The third party service providers have their own
            privacy policies addressing how they use such information.
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            Your rights relating to your data
          </h1>
          <div className="px-4">
            <span className="text-brown">Right to Review -</span> You can review
            the data provided by you and can request us to correct or amend such
            data (to the extent feasible, as determined by us). That said, we
            will not be responsible for the authenticity of the data or
            information provided by you.
            <br />
            <span className="text-brown">
              {" "}
              Withdrawal of your Consent -{" "}
            </span>{" "}
            You can choose not to provide your data, at any time while availing
            our goods or services or otherwise withdraw your consent provided to
            us earlier, in writing to our email ID: sarojsurin1973@gmail.comIn
            the event you choose to not provide or later withdraw your consent,
            we may not be able to provide you our services or goods.Please note
            that these rights are subject to our compliance with applicable laws
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            How long will we retain your information or data?
          </h1>
          <div className="px-4">
            We may retain your information or data (i) for as long as we are
            providing goods and services to you; and (ii) as permitted under
            applicable law, we may also retain your data or information even
            after you terminate the business relationship with us. However, we
            will process such information or data in accordance with applicable
            laws and this Policy.
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">Data Security</h1>
          <div className="px-4">
            We will use commercially reasonable and legally required precautions
            to preserve the integrity and security of your information and data.
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-lg text-brown font-semibold">
            Queries/ Grievance Officer
          </h1>
          <div className="px-4">
            For any queries, questions or grievances about this Policy, please
            contact us using the contact information provided on this website.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
