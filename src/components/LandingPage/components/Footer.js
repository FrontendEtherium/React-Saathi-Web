import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import googlePlay from "../../../assets/images/googleplay.png";
import appStore from "../../../assets/images/appstore.png";

const Footer = () => {
  // States for modals
  const [showTnCModal, setShowTnCModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Functions to open/close modals
  const handleTnCModalClose = () => setShowTnCModal(false);
  const handleTnCModalShow = () => setShowTnCModal(true);

  const handlePrivacyModalClose = () => setShowPrivacyModal(false);
  const handlePrivacyModalShow = () => setShowPrivacyModal(true);

  return (
    <footer className="bg-default text-gray-300 py-2">
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start lg:items-center gap-8">
          {/* Contact Us Section */}
          <div className="md:w-1/3">
            <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:info@etheriumtech.com"
                className="text-blue-400 hover:text-white text-base"
              >
                info@etheriumtech.com
              </a>
            </p>
            <p className="mb-4">
              Phone:{" "}
              <a
                href="tel:+911912959035"
                className="text-blue-400 hover:text-white text-base"
              >
                +91 1912959035
              </a>
            </p>
          </div>

          {/* App Promotion Section */}
          <div className="md:w-1/3 text-left md:text-left">
            <p
              className="text-blue-400 hover:text-white cursor-pointer mb-2 text-base"
              onClick={handleTnCModalShow}
            >
              Terms & Conditions
            </p>
            <p
              className="text-blue-400 hover:text-white cursor-pointer mb-4 text-base"
              onClick={handlePrivacyModalShow}
            >
              Privacy Policy
            </p>
            <p className="text-white mb-2 text-base">Download our app:</p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#googleplay">
                <img
                  src={googlePlay}
                  alt="Google Play Link"
                  className="w-36 object-contain rounded-lg shadow-lg"
                  style={{ width: "148px", maxHeight: "45px", marginBottom: "7px", marginRight: "5px" }}
                />
              </a>
              <a href="#appstore">
                <img
                  src={appStore}
                  alt="App Store Link"
                  className="w-36 object-contain rounded-lg shadow-lg"
                  style={{ width: "148px", maxHeight: "45px", marginBottom: "7px", marginRight: "5px" }}
                />
              </a>
            </div>
          </div>
          
        </div>
        <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Saathi. All rights reserved.
          </p>
        {/* Copyright Section */}
      
      </div>

      {/* Modal for Terms & Conditions */}
      <Modal show={showTnCModal} onHide={handleTnCModalClose} centered >
        <Modal.Header closeButton className="m-4">
          <Modal.Title >Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div>
          <p>
            <strong>1. Introduction</strong>
          </p>
          <p>
            Welcome to Saathi, a service designed to provide support for loved
            ones in semi-urban and rural areas. By accessing or using our
            website and mobile app, you agree to comply with and be bound by the
            following terms and conditions. Please review these terms carefully,
            and if you disagree with any part, do not use our services.
          </p>

          <p>
            <strong>2. Services</strong>
          </p>
          <p>
            Saathi offers various service packages that involve regular phone
            calls, home visits, and errand services for patrons (the family
            members of subscribers). Details of the available packages and their
            associated fees are outlined on our website and mobile app. The
            services provided will be documented in the ‘My Feed’ section for
            subscribers to review.
          </p>

          <p>
            <strong>3. Subscription Plans</strong>
          </p>
          <p>
            Subscribers can choose from the following subscription plans: <br />
            <strong>Basic Plan</strong>
            <br />
            <strong>Bronze Plan</strong>
            <br />
            <strong>Silver Plan</strong>
            <br />
            <strong>Gold Plan</strong>
            <br />
            Each plan offers a set of services, such as phone calls, house
            visits, errand runs, and driving services. Details of each plan,
            including the frequency of services and their associated costs, are
            listed on the website.
          </p>

          <p>
            <strong>4. A-La-Carte Services</strong>
          </p>
          <p>
            In addition to subscription plans, subscribers can purchase
            individual services on an a-la-carte basis. These include additional
            house checks, errand runs, and destination drives. Pricing for these
            services will be outlined in the mobile app.
          </p>

          <p>
            <strong>5. User Accounts</strong>
          </p>
          <p>
            To use the full features of our services, users must register and
            create an account via the mobile app. It is the responsibility of
            the user to ensure the confidentiality of their account information
            and password. Users must notify us immediately of any unauthorized
            access to their account.
          </p>

          <p>
            <strong>6. Payment</strong>
          </p>
          <p>
            All payments for subscription plans and a-la-carte services will be
            handled via phone and auto-billing. Subscribers are responsible for
            ensuring their payment details are up-to-date to avoid service
            interruptions.
          </p>

          <p>
            <strong>7. Service Availability</strong>
          </p>
          <p>
            We aim to provide our services as outlined, but service availability
            may be affected by factors beyond our control, such as weather
            conditions or local restrictions. In the event of a service
            disruption, we will notify users as soon as possible and strive to
            reschedule the affected services.
          </p>

          <p>
            <strong>8. Surge Pricing</strong>
          </p>
          <p>
            Certain services, such as driving and errand runs, may incur
            additional charges during non-business hours. Details of surge
            pricing will be communicated to the subscriber at the time of
            booking.
          </p>

          <p>
            <strong>9. Cancellation and Refund Policy</strong>
          </p>
          <p>
            Subscribers may cancel their subscription or a-la-carte services at
            any time via the mobile app. Refunds will be processed based on the
            terms of the specific subscription plan or service.
          </p>

          <p>
            <strong>10. Limitation of Liability</strong>
          </p>
          <p>
            Saathi, its employees, and affiliates will not be liable for any
            direct, indirect, incidental, or consequential damages arising from
            the use of our services. Users agree to use the services at their
            own risk.
          </p>

          <p>
            <strong>11. Amendments to the Terms</strong>
          </p>
          <p>
            Saathi reserves the right to update these terms and conditions at
            any time. Any changes will be communicated to subscribers through
            the mobile app or website.
          </p>

          <p>
            <strong>12. Contact Information</strong>
          </p>
          <p>
            If you have any questions or concerns regarding these terms, please
            contact us.
          </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTnCModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Privacy Policy */}
      <Modal show={showPrivacyModal} onHide={handlePrivacyModalClose} centered>
        <Modal.Header closeButton className="m-4">
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Saathi</strong> ("we," "us," or "our") is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website and use our mobile app. Please read this privacy
            policy carefully. If you do not agree with the terms of this policy,
            please do not use our services.
          </p>

          <p>
            <strong>1. Information We Collect</strong>
          </p>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you register, use our services, or interact with our website
            and mobile app.
          </p>
          <p>
            <strong>Types of Information Collected:</strong>
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> This includes your name, phone
              number, email address, billing information, and any other personal
              information you provide when you create an account or subscribe to
              our services.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect information about how
              you use our services, such as browsing behavior, search queries,
              app usage patterns, and interaction with features of the website
              or mobile app.
            </li>
            <li>
              <strong>Device Data:</strong> We may collect information about the
              device you use to access our services, such as your IP address,
              browser type, device model, and operating system.
            </li>
          </ul>

          <p>
            <strong>2. How We Use Your Information</strong>
          </p>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To create and manage your account.</li>
            <li>
              To provide the services you have subscribed to, including managing
              interactions with your designated patrons.
            </li>
            <li>To process payments for services.</li>
            <li>
              To improve our services, website, and app functionalities based on
              user feedback and usage.
            </li>
            <li>
              To communicate with you, including sending service-related
              announcements or promotional content.
            </li>
            <li>To respond to inquiries and provide customer support.</li>
          </ul>

          <p>
            <strong>3. Sharing of Your Information</strong>
          </p>
          <p>
            We do not sell or rent your personal information to third parties.
            However, we may share your information in the following situations:
          </p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your
              information with third-party vendors or service providers who
              perform functions on our behalf, such as payment processing,
              customer service, and app maintenance.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required by law or in response to a valid request
              by a government authority, such as a court or law enforcement
              agency.
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of all or a portion of our assets, your
              personal information may be transferred to the new ownership.
            </li>
          </ul>

          <p>
            <strong>4. Data Security</strong>
          </p>
          <p>
            We implement appropriate technical and organizational measures to
            protect the security of your personal data. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            and we cannot guarantee its absolute security.
          </p>

          <p>
            <strong>5. Cookies and Tracking Technologies</strong>
          </p>
          <p>
            We may use cookies and similar tracking technologies to collect and
            store your information. These technologies help improve your
            experience by recognizing your preferences and improving website and
            app performance.
          </p>
          <ul>
            <li>
              <strong>Cookies:</strong> Small text files placed on your device
              that allow us to track usage behavior and personalize your
              experience.
            </li>
            <li>
              <strong>Tracking Technologies:</strong> These may include beacons,
              tags, and scripts to collect and track information and improve our
              services.
            </li>
          </ul>
          <p>
            You can choose to disable cookies through your browser settings;
            however, some parts of the website may become inaccessible or not
            function properly.
          </p>

          <p>
            <strong>6. Third-Party Links</strong>
          </p>
          <p>
            Our website or mobile app may contain links to third-party websites
            or services. We are not responsible for the privacy practices or
            content of these third parties. We encourage you to review the
            privacy policies of every website you visit.
          </p>

          <p>
            <strong>7. Your Data Rights</strong>
          </p>
          <p>
            Depending on your location, you may have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You have the right to request a copy of
              the personal data we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct any
              incorrect or incomplete data.
            </li>
            <li>
              <strong>Deletion:</strong> You may request that we delete your
              personal data, subject to certain conditions.
            </li>
            <li>
              <strong>Objection:</strong> You have the right to object to our
              processing of your data in certain circumstances.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at [insert
            contact information].
          </p>

          <p>
            <strong>8. Children's Privacy</strong>
          </p>
          <p>
            Our services are not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children under
            18. If we learn that we have collected data from a child under 18
            without verification of parental consent, we will delete that
            information as soon as possible.
          </p>

          <p>
            <strong>9. Changes to This Privacy Policy</strong>
          </p>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal obligations. We will notify you of
            any significant changes by posting the new policy on our website or
            mobile app. Please review this policy periodically to stay informed
            about how we are protecting your information.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePrivacyModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;
