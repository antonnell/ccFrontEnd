import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {};

class PrivacyPolicy extends Component {
  render() {
    var paragraphStyle = { textAlign: "justify", marginTop: "12px" };

    return (
      <Grid
        container
        justify="space-around"
        alignItems="center"
        direction="row"
        spacing={0}
        style={{ marginTop: "50px" }}
      >
        <Grid item xs={10} sm={10} md={10} lg={10} align="left">
          <Typography variant="h5" align="center">
            CRYPTOCURVE PRIVACY POLICY
          </Typography>
          <p style={{ paragraphStyle, fontWeight: "bold" }}>Introduction</p>
          <p style={paragraphStyle}>
            Welcome to the CryptoCurve's privacy policy.
          </p>
          <p style={paragraphStyle}>
              CryptoCurve respects your privacy and is committed to protecting
              your personal data. This privacy notice will inform you as to how
              we look after your personal data when you visit our website
              (regardless of where you visit it from) and tell you about your
              privacy rights and how the law protects you.
          </p>
          <p style={paragraphStyle}>
              Please also use the Glossary to understand the meaning of some of
              the terms used in this privacy notice.
          </p>
          <ol style={{ paddingLeft: "0px" }}>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>Glossary</p>
              <p
                style={{ paragraphStyle, fontWeight: "bold", fontSize: "16px" }}
              >
                LAWFUL BASIS
              </p>
              <p style={paragraphStyle}>
                  <strong>Legitimate Interest</strong> means the interest of our
                  business in conducting and managing our business to enable us
                  to give you the best service and the best and most secure
                  experience. We make sure we consider and balance any potential
                  impact on you (both positive and negative) and your rights
                  before we process your personal data for our legitimate
                  interests. We do not use your personal data for activities
                  where our interests are overridden by the impact on you
                  (unless we have your consent or are otherwise required or
                  permitted to by law). <strong>Performance of Contract</strong>{" "}
                  means processing your data where it is necessary for the
                  performance of a contract to which you are a party or to take
                  steps at your request before entering into such a contract.
              </p>
              <p style={paragraphStyle}>
                  <strong>Comply with a legal or regulatory obligation</strong>{" "}
                  means processing your personal data where it is necessary for
                  compliance with a legal or regulatory obligation that we are
                  subject to.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                THIRD PARTIES
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Internal Third Parties
              </p>
              <p style={paragraphStyle}>
                  Other companies in the Company Group acting as joint
                  controllers or processors and who are based in US and Cayman
                  Island.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                External Third Parties
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Service providers who provide IT and system administration
                  services.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Professional advisers, including lawyers, bankers, auditors
                  and insurers based in NL, UK and US who provide consultancy,
                  banking, legal, insurance and accounting services.
                </li>
              </ul>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Important information and who we are
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Purpose of this privacy notice
              </p>
              <p style={paragraphStyle}>
                  This privacy notice aims to give you information on how
                  CryptoCurve collects and processes your personal data through
                  your use of this website.
                  This website is not intended for children and we do not
                  knowingly collect data relating to children.
              </p>
              <p style={paragraphStyle}>
                  It is important that you read this privacy notice together
                  with any other privacy notice or fair processing notice we may
                  provide on specific occasions when we are collecting or
                  processing personal data about you so that you are fully aware
                  of how and why we are using your data. This privacy notice
                  supplements the other notices and is not intended to override
                  them.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Controller
              </p>
              <p style={paragraphStyle}>
                  CryptoCurve Ltd. is the controller and responsible for your
                  personal data (collectively referred to as “CryptoCurve”,
                  "Company", "we", "us" or "our" in this privacy notice).
              </p>
              <p style={paragraphStyle}>
                  We have appointed a data privacy manager (DPM) who is
                  responsible for overseeing questions in relation to this
                  privacy policy. If you have any questions about this privacy
                  policy, including any requests to exercise your legal rights,
                  please contact the DPM using the details set out below.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Contact details
              </p>
              <p style={paragraphStyle}>
                Full name of legal entity:
                CryptoCurve Ltd.
              </p>
              <p style={paragraphStyle}>Company number: 11027490</p>
              <p style={paragraphStyle}>
                Registered office address: The Senate, Southernhay Gardens,
                Exeter, England, EX1 1UG
              </p>
              <p style={paragraphStyle}>
                Name and title of DPM: Xander Yi - CFO
              </p>
              <p style={paragraphStyle}>
                Email address: xander@cryptocurve.io
              </p>
              <p style={paragraphStyle}>
                Telephone number: +15712576498
              </p>
              <p style={paragraphStyle}>
                  You have the right to make a complaint at any time to the
                  Information Commissioner's Office (ICO), the UK supervisory
                  authority for data protection issues (
                  <a href="http://www.ico.org.uk">www.ico.org.uk</a>). We would,
                  however, appreciate the chance to deal with your concerns
                  before you approach the ICO so please contact us in the first
                  instance.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                  Changes to the privacy notice and your duty to inform us of
                  changes
              </p>
              <p style={paragraphStyle}>
                  This version was last updated on 25 June 2018 and historic
                  versions can be obtained by contacting us.
              </p>
              <p style={paragraphStyle}>
                  It is important that the personal data we hold about you is
                  accurate and current. Please keep us informed if your personal
                  data changes during your relationship with us.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Third-party links
              </p>
              <p style={paragraphStyle}>
                  This website may include links to third-party websites,
                  plug-ins and applications. Clicking on those links or enabling
                  those connections may allow third parties to collect or share
                  data about you. We do not control these third-party websites
                  and are not responsible for their privacy statements. When you
                  leave our website, we encourage you to read the privacy notice
                  of every website you visit.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                The data we collect about you
              </p>
              <p style={paragraphStyle}>
                  Personal data, or personal information, means any information
                  about an individual from which that person can be identified.
                  It does not include data where the identity has been removed
                  (anonymous data).
              </p>
              <p style={paragraphStyle}>
                  We may collect, use, store and transfer different kinds of
                  personal data about you which we have grouped together
                  follows:
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Identity Data</strong> includes your name and a copy
                  of your photo identification.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Contact Data</strong> includes your email address and
                  physical address.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Technical Data</strong> includes internet protocol
                  (IP) address, your login data, browser type and version, time
                  zone setting and location, browser plug-in types and versions,
                  operating system and platform and other technology on the
                  devices you use to access this website.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Profile Data </strong> includes<strong> </strong>your
                  username and password.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Usage Data</strong> includes information about how you
                  use our website, products and services.
                </li>
              </ul>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                If you fail to provide personal data
              </p>
              <p style={paragraphStyle}>
                Where we need to collect personal data by law, or under the
                terms of a contract we have with you and you fail to provide
                that data when requested, we may not be able to perform the
                contract we have or are trying to enter into with you (for
                example, to provide you with services). In this case, we may
                have to cancel a product or service you have with us but we will
                notify you if this is the case at the time.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                How is your personal data collected?
              </p>
              <p style={paragraphStyle}>
                  We use different methods to collect data from and about you
                  including through:
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Direct interactions.</strong> You may give us your
                  personal data by filling in forms or by corresponding with us
                  by post, phone, email or otherwise. This includes personal
                  data you provide when you enquire about our products or
                  services.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Automated technologies or interactions.</strong> As
                  you interact with our website, we may automatically collect
                  Technical Data about your equipment, browsing actions and
                  patterns. We collect this personal data by using cookies and
                  other similar technologies.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  <strong>Third parties or publicly available sources.</strong>{" "}
                  We may receive personal data about you from various third
                  parties and public sources.
                </li>
              </ul>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                How we use your personal data
              </p>
              <p style={paragraphStyle}>
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Where it is necessary for our legitimate interests (or those
                  of a third party) and your interests and fundamental rights do
                  not override those interests.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Where we need to comply with a legal or regulatory obligation.
                </li>
              </ul>
              <p style={paragraphStyle}>
                  Generally we do not rely on consent as a legal basis for
                  processing your personal data.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                  Purposes for which we will use your personal data
              </p>
              <p style={paragraphStyle}>
                  We have set out below, in a table format, a description of all
                  the ways we plan to use your personal data, and which of the
                  legal bases we rely on to do so. We have also identified what
                  our legitimate interests are where appropriate.
              </p>
              <p style={paragraphStyle}>
                  Note that we may process your personal data for more than one
                  lawful ground depending on the specific purpose for which we
                  are using your data.
              </p>
              <table border="1" cellSpacing="0" cellPadding="16">
                <tbody>
                  <tr>
                    <td width="520" valign="top">
                      <p style={paragraphStyle}>
                        <strong>Purpose/Activity</strong>
                      </p>
                    </td>
                    <td width="400" valign="top">
                      <p style={paragraphStyle}>
                        <strong>Type of data</strong>
                      </p>
                    </td>
                    <td width="600" valign="top">
                      <p style={paragraphStyle}>
                        <strong>
                          Lawful basis for processing including basis of
                          legitimate interest
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top">
                      <p style={paragraphStyle}>
                        To register you as a new client
                      </p>
                    </td>
                    <td width="184" valign="top">
                      <p style={paragraphStyle}>(a) Identity</p>
                      <p style={paragraphStyle}>(b) Contact</p>
                    </td>
                    <td width="291" valign="top">
                      <p style={paragraphStyle}>
                        Performance of a contract with you
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top" />
                    <td width="184" valign="top" />
                    <td width="291" valign="top" />
                  </tr>
                  <tr>
                    <td width="237" valign="top">
                      <p style={paragraphStyle}>
                        To manage our relationship with you which will includes
                        notifying you about changes to our terms or privacy
                        policy
                      </p>
                    </td>
                    <td width="184" valign="top">
                      <p style={paragraphStyle}>(a) Identity</p>
                      <p style={paragraphStyle}>(b) Contact</p>
                    </td>
                    <td width="291" valign="top">
                      <p style={paragraphStyle}>
                        (a) Performance of a contract with you
                      </p>
                      <p style={paragraphStyle}>
                        (b) Necessary to comply with a legal obligation
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top" />
                    <td width="184" valign="top" />
                    <td width="291" valign="top" />
                  </tr>
                  <tr>
                    <td width="237" valign="top">
                      <p style={paragraphStyle}>
                        To administer and protect our business and this website
                        (including troubleshooting, data analysis, testing,
                        system maintenance, support, reporting and hosting of
                        data, KYC/AML compliance on connection with any business
                        transactions)
                      </p>
                    </td>
                    <td width="184" valign="top">
                      <p style={paragraphStyle}>(a) Identity</p>
                      <p style={paragraphStyle}>(b) Contact</p>
                      <p style={paragraphStyle}>(c) Technical</p>
                    </td>
                    <td width="291" valign="top">
                      <p style={paragraphStyle}>
                        (a) Necessary for our legitimate interests (for running
                        our business, provision of administration and IT
                        services, network security, to prevent fraud and in the
                        context of a business reorganisation or group
                        restructuring exercise)
                      </p>
                      <p style={paragraphStyle}>
                        (b) Necessary to comply with a legal obligation
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top">
                      <p style={paragraphStyle}>
                        To deliver relevant website content to you
                      </p>
                    </td>
                    <td width="184" valign="top">
                      <p style={paragraphStyle}>(a) Identity</p>
                      <p style={paragraphStyle}>(b) Contact</p>
                      <p style={paragraphStyle}>(c) Profile</p>
                      <p style={paragraphStyle}>(d) Usage</p>
                      <p style={paragraphStyle}>(f) Technical</p>
                    </td>
                    <td width="291" valign="top">
                      <p style={paragraphStyle}>
                        Necessary for our legitimate interests (to study how
                        clients use our products/services, to develop them and
                        to grow our business)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top">
                      <p style={paragraphStyle}>
                        To use data analytics to improve our website,
                        products/services, client relationships and experiences
                      </p>
                    </td>
                    <td width="184" valign="top">
                      <p style={paragraphStyle}>(a) Technical</p>
                      <p style={paragraphStyle}>(b) Usage</p>
                    </td>
                    <td width="291" valign="top">
                      <p style={paragraphStyle}>
                        Necessary for our legitimate interests (to define types
                        of clients for our products and services, to keep our
                        website updated and relevant and to develop our
                        business)
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="237" valign="top" />
                    <td width="184" valign="top" />
                    <td width="291" valign="top" />
                  </tr>
                </tbody>
              </table>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Cookies
              </p>
              <p style={paragraphStyle}>
                  You can set your browser to refuse all or some browser
                  cookies, or to alert you when websites set or access cookies.
                  If you disable or refuse cookies, please note that some parts
                  of this website may become inaccessible or not function
                  properly. For more information about the cookies we use,
                  please see our{" "}
                  <a href="https://cryptocurve.network/#cookiePolicy">
                    Cookie Policy
                  </a>
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Change of purpose
              </p>
              <p style={paragraphStyle}>
                  We will only use your personal data for the purposes for which
                  we collected it, unless we reasonably consider that we need to
                  use it for another reason and that reason is compatible with
                  the original purpose. If you wish to get an explanation as to
                  how the processing for the new purpose is compatible with the
                  original purpose, please contact us.
              </p>
              <p style={paragraphStyle}>
                  If we need to use your personal data for an unrelated purpose,
                  we will notify you and we will explain the legal basis which
                  allows us to do so.
              </p>
              <p style={paragraphStyle}>
                  Please note that we may process your personal data without
                  your knowledge or consent, in compliance with the above rules,
                  where this is required or permitted by law.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Disclosures of your personal data
              </p>
              <p style={paragraphStyle}>
                  We may have to share your personal data with the parties set
                  out below for the purposes set out in the table in paragraph 5
                  above.
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Internal Third Parties as set out in the <em>Glossary</em>.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  External Third Parties as set out in the <em>Glossary</em>.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Third parties to whom we may choose to sell, transfer, or
                  merge parts of our business or our assets. Alternatively, we
                  may seek to acquire other businesses or merge with them. If a
                  change happens to our business, then the new owners may use
                  your personal data in the same way as set out in this privacy
                  notice.
                </li>
              </ul>
              <p style={paragraphStyle}>
                  We require all third parties to respect the security of your
                  personal data and to treat it in accordance with the law. We
                  do not allow our third-party service providers to use your
                  personal data for their own purposes and only permit them to
                  process your personal data for specified purposes and in
                  accordance with our instructions.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                International transfers
              </p>
              <p style={paragraphStyle}>
                  We share your personal data within the Company Group. This
                  will involve transferring your data outside the European
                  Economic Area (<strong>EEA</strong>).
              </p>
              <p style={paragraphStyle}>
                  We ensure your personal data is protected by requiring all our
                  group companies to follow the same rules when processing your
                  personal data. These rules are called "binding corporate
                  rules".
                  Some of our external third parties are based outside the
                  European Economic Area (<strong>EEA</strong>) so their
                  processing of your personal data will involve a transfer of
                  data outside the EEA.
              </p>
              <p style={paragraphStyle}>
                  Whenever we transfer your personal data out of the EEA, we
                  ensure a similar degree of protection is afforded to it by
                  ensuring at least one of the following safeguards is
                  implemented:
              </p>
              <ul style={{ paddingLeft: "18px" }}>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  We will only transfer your personal data to countries that
                  have been deemed to provide an adequate level of protection
                  for personal data by the European Commission.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Where we use certain service providers, we may use specific
                  contracts approved by the European Commission which give
                  personal data the same protection it has in Europe.
                </li>
                <li
                  style={{
                    paragraphStyle,
                    listStyleType: "disc",
                    paddingBottom: "6px"
                  }}
                >
                  Where we use providers based in the US, we may transfer data
                  to them if they are part of the Privacy Shield which requires
                  them to provide similar protection to personal data shared
                  between the Europe and the US. Please contact us if you want
                  further information on the specific mechanism used by us when
                  transferring your personal data out of the EEA. <strong />
                </li>
              </ul>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Data security
              </p>
              <p style={paragraphStyle}>
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorised way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know. They will only process your
                  personal data on our instructions and they are subject to a
                  duty of confidentiality.
              </p>
              <p style={paragraphStyle}>
                  We have put in place procedures to deal with any suspected
                  personal data breach and will notify you and any applicable
                  regulator of a breach where we are legally required to do so.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                Data retention
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                  How long will you use my personal data for?
              </p>
              <p style={paragraphStyle}>
                  We will only retain your personal data for as long as
                  necessary to fulfil the purposes we collected it for,
                  including for the purposes of satisfying any legal,
                  accounting, or reporting requirements.
              </p>
              <p style={paragraphStyle}>
                  To determine the appropriate retention period for personal
                  data, we consider the amount, nature, and sensitivity of the
                  personal data, the potential risk of harm from unauthorised
                  use or disclosure of your personal data, the purposes for
                  which we process your personal data and whether we can achieve
                  those purposes through other means, and the applicable legal
                  requirements.
              </p>
              <p style={paragraphStyle}>
                  In some circumstances you can ask us to delete your data: see{" "}
                  <em>Request erasure</em> below for further information.
              </p>
              <p style={paragraphStyle}>
                  In some circumstances we may anonymise your personal data (so
                  that it can no longer be associated with you) for research or
                  statistical purposes in which case we may use this information
                  indefinitely without further notice to you.
              </p>
            </li>
            <li>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                YOUR LEGAL RIGHTS
              </p>
              <p style={paragraphStyle}>
                You have the right to:
              </p>
              <p style={paragraphStyle}>
                  <strong>Request access </strong> to your personal data
                  (commonly known as a "data subject access request"). This
                  enables you to receive a copy of the personal data we hold
                  about you and to check that we are lawfully processing it.
              </p>
              <p style={paragraphStyle}>
                  <strong>Request correction </strong> of the personal data that
                  we hold about you. This enables you to have any incomplete or
                  inaccurate data we hold about you corrected, though we may
                  need to verify the accuracy of the new data you provide to us.
              </p>
              <p style={paragraphStyle}>
                  <strong>Request erasure </strong> of your personal data. This
                  enables you to ask us to delete or remove personal data where
                  there is no good reason for us continuing to process it. You
                  also have the right to ask us to delete or remove your
                  personal data where you have successfully exercised your right
                  to object to processing (see below), where we may have
                  processed your information unlawfully or where we are required
                  to erase your personal data to comply with local law. Note,
                  however, that we may not always be able to comply with your
                  request of erasure for specific legal reasons which will be
                  notified to you, if applicable, at the time of your request.
              </p>
              <p style={paragraphStyle}>
                  <strong>Object to processing </strong> of your personal data
                  where we are relying on a legitimate interest (or those of a
                  third party) and there is something about your particular
                  situation which makes you want to object to processing on this
                  ground as you feel it impacts on your fundamental rights and
                  freedoms. In some cases, we may demonstrate that we have
                  compelling legitimate grounds to process your information
                  which override your rights and freedoms.
              </p>
              <p style={paragraphStyle}>
                  <strong>Request restriction of processing </strong> of your
                  personal data. This enables you to ask us to suspend the
                  processing of your personal data in the following scenarios:
                  (a) if you want us to establish the data's accuracy; (b) where
                  our use of the data is unlawful but you do not want us to
                  erase it; (c) where you need us to hold the data even if we no
                  longer require it as you need it to establish, exercise or
                  defend legal claims; or (d) you have objected to our use of
                  your data but we need to verify whether we have overriding
                  legitimate grounds to use it.
              </p>
              <p style={paragraphStyle}>
                  <strong>Request the transfer </strong> of your personal data
                  to you or to a third party. We will provide to you, or a third
                  party you have chosen, your personal data in a structured,
                  commonly used, machine-readable format.
              </p>
              <p style={paragraphStyle}>
                  <strong>Withdraw consent at any time </strong> where we are
                  relying on consent to process your personal data. However,
                  this will not affect the lawfulness of any processing carried
                  out before you withdraw your consent. If you withdraw your
                  consent, we may not be able to provide certain products or
                  services to you. We will advise you if this is the case at the
                  time you withdraw your consent.
              </p>
              <p style={{ paragraphStyle, fontWeight: "bold" }}>
                No fee usually required
              </p>
              <p style={paragraphStyle}>
                You will not have to pay a fee to access your personal data (or
                to exercise any of the other rights). However, we may charge a
                reasonable fee if your request is clearly unfounded, repetitive
                or excessive. Alternatively, we may refuse to comply with your
                request in these circumstances.
              </p>
              <p style={paragraphStyle}>Time limit to respond</p>
              <p style={paragraphStyle}>
                We try to respond to all legitimate requests within one month.
                Occasionally it may take us longer than a month if your request
                is particularly complex or you have made a number of requests.
                In this case, we will notify you and keep you updated.
              </p>
              <p style={paragraphStyle}>
                If you wish to exercise any of the rights set out above, please
                contact us.
              </p>
            </li>
          </ol>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(PrivacyPolicy);
