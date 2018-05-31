import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

class TermsModal extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    var paragraphStyle = {textAlign: 'justify', marginTop: '12px'}
    return (
      <Dialog open={this.props.isOpen} title="Disclaimer" onClose={this.props.handleClose} >
        <DialogTitle id="alert-dialog-title">
          <Typography variant='title' align='center'>
            CURV SALE TERMS & CONDITIONS
          </Typography>
        </DialogTitle>
        <DialogContent>
          <p style={paragraphStyle}>
              PLEASE READ THESE SALE TERMS &amp; CONDITIONS CAREFULLY. NOTE THAT SECTION
              18 CONTAINS A BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER, WHICH
              AFFECT YOUR LEGAL RIGHTS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT
              PURCHASE TOKENS. Your purchase of CURV tokens (“<b>Tokens</b>”) during the
              Sale (as defined below) from Stichting CryptoCurve, a Dutch foundation (the
              “<b>Company</b>,” “<b>we</b>,” or “<b>us</b>”) is subject to these terms of
              sale (“<b>Terms</b>”). Each of you and Company is a “<b>Party</b>” and,
              together, the “<b>Parties</b>.” By purchasing Tokens from us during the
              Sale, you will be bound by these Terms and any terms incorporated by
              reference. If you have any questions regarding these Terms, please contact
              us at support@cryptocurve.io.
          </p>
          <p style={paragraphStyle}>
              You and Company agree as follows:
          </p>
          <ol start="1" type="1">
              <li style={paragraphStyle}>
                  <u>Commencement and Duration of Sale</u>
                  . The Company will sell 207,500,000 Tokens, via public and private
                  sale. The public sale of Tokens (the “<b>Sale</b>”) shall take place on
                  June 30, 2018 (the “<b>Launch Date</b>”) and end in 30 days or
                  30,000,000 Tokens sold, whichever is first (the “<b>Sale End Date</b>
          ”). The Company will also conduct a private sale of Tokens (the “<b>Private</b> <b>Sale</b>”) which will be ongoing beginning on May 31,
                  2018 (the “<b>Private Sale</b>”). This sale will conclude when
                  130,000,000 Tokens (or SAFT convertible to Tokens) have been sold.
                  Bonus tokens are provided free of cost with purchased tokens and are
                  not included in the above total quantities.
              </li>
              <li style={paragraphStyle}>
                  <u>Eligibility</u>
                  . In order to be eligible to participate in the Sale and to log into
                  the Sale portal to make a purchase, you agree to allow the Company,
                  through our Know Your Customer and Anti-Money Laundering Compliance
                  partners, Netki and ComplyAdvantage, to check all submitted personal
                  information (your “<b>User Credentials</b>”) against their database of
                  people ineligible to purchase tokens. You must also have a Wanchain
                  wallet that supports the Token standard in order to receive any Tokens
          you purchase from us and provide the address for that wallet (the “<b>Token Receipt Address</b>”) or you may create one using our Sale
                  platform. We will not be held liable if you misplace your private key
                  for the wallet created on our platform or submit an address from an
                  exchange wallet such as coinbase.com which does not provide you with
                  the private key for Token access. We reserve the right to prescribe
                  additional guidance regarding specific wallet requirements.
              </li>
              <li style={paragraphStyle}>
                  <u>Purchase and Sale of Tokens</u>
                  .
                  <p>
                  (a) <u>Price; Payment Currencies</u>. The USD price per Token (“<b>Price Per Token</b>”) is set forth on our website www.cryptocurve.io
                  (the “<b>Website</b>”) and Sale portal at cryptocurve.network (the “<b>Sale Portal</b>”). Tokens may be purchased with Ethereum (“<b>ETH</b>”)
                  or Wanchain (“<b>WAN</b>”) (collectively, “<b>Blockchain Tokens</b>” or “<b>BCTs</b>”) depending on the round of sale as set forth on the Company’s
                      website.
                  </p>
                  <p>
                      (b) <u>Purchase Procedure</u>. After logging into the Sale Portal via the
                      Website, you will be prompted to select the amount of ETH you wish to
                      allocate toward your purchase of Tokens (or SAFT convertible to Token where
                      applicable). We reserve the right, in our sole discretion, to modify any of
                      the procedures described herein to account for network congestion or other
                      technical challenges.
                  </p>
                  <p>
                      (c) <u>Purchase Price</u>. Your quoted “<b>Purchase Price</b>” in the
                      selected BCTs is equal to the USD value of the Token shown as your purchase
                      amount on the Sale Portal divided by the Exchange Rate (as defined below).
                      The “<b>Exchange Rate</b>” will be the exchange rate between BCTs and USD
                      as published by the Company on its Website ahead of each Sale.
                  </p>
                  <p>
                      (d) <u>Purchase Price Must Be Received in Full Upon Purchase</u>. Payment
                      is due in full at time of purchase. Your Tokens will be released once
                      receipt of the full Purchase Price has been confirmed plus processing time
                      detailed in this document. We reserve the right, in our sole discretion, to
                      modify any of the timelines described herein to account for network
                      congestion or other technical challenges.
                  </p>
                  <p>
                      (e) <u>Payment of Purchase Price</u>. You must pay the Purchase Price by
                      sending the correct quantity of BCTs to the unique address displayed to you
                      via the Sale portal. Your purchase is not guaranteed until we receive the
                      full amount of the Purchase Price.
                  </p>
                  <p>
                      (f) <u>User Information and Limits</u>. You agree that all entered
                      information is accurate. You alone are responsible for any acts or
                      omissions that occur during the Sale through the use of your User
                      Credentials. We reserve the right to suspend or block your access to the
                      Sale upon suspicion of any unauthorized access or use, or any attempt
                      thereof, by anyone associated with your User Credentials.
                  </p>
                  <p>
                      <a name="_Hlk510775427">(g) <u>Delivery of Tokens</u></a>
                      . <a name="_Hlk510791640">Company </a>shall deliver the purchased Tokens to
                      you within seven (7) days of the conclusion of the Sale. The Tokens may be
                      subject to use and/or transfer restrictions in accordance with the lockup
                      terms published by the Company ahead of the Sale (or as otherwise set forth
                      in the SAFT if applicable).
                  </p>
                  <p>
                      (h) <u>Country Restrictions</u>. THE TOKENS ARE NOT BEING OFFERED OR SOLD
                      AND MAY NOT BE OFFERED OR SOLD, DIRECTLY OR INDIRECTLY, WITHIN THE UNITED
                      STATES OF AMERICA OR CANADA OR TO ANY RESIDENT OR HOLDER OF A PASSPORT OF
                      THE UNITED STATES OF AMERICA OR CANADA. THIS AGREEMENT DOES NOT IN ANY WAY
                      CONSTITUTE, AND NONE OF ITS PROVISIONS SHOULD BE READ AS, SUCH AN OFFER.
                      ANY PERSON IN THE UNITED STATES OF AMRERICA OR CANADA OR WITH A PASSPORT OF
                      THE UNITED STATES OF AMERICA OR CANADA SHOULD NOT ACT OR RELY ON THIS
                      AGREEMENT OR ANY OF ITS CONTENTS. THE TOKENS ARE NOT BEING OFFERED OR SOLD
                      AND MAY NOT BE OFFERED OR SOLD, DIRECTLY OR INDIRECTLY, WITHIN THE PEOPLE’S
                      REPUBLIC OF CHINA OR TO ANY RESIDENT OR HOLDER OF A PASSPORT OF THE
                      PEOPLE’S REPUBLIC OF CHINA. THIS AGREEMENT DOES NOT IN ANY WAY CONSTITUTE,
                      AND NONE OF ITS PROVISIONS SHOULD BE READ AS, SUCH AN OFFER. ANY PERSON IN
                      THE PEOPLE’S REPUBLIC OF CHINA OR WITH A PASSPORT OF THE PEOPLE’S REPUBLIC
                      OF CHINA SHOULD NOT ACT OR RELY ON THIS AGREEMENT OR ANY OF ITS CONTENTS.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Purpose and Use of Tokens in the Ecosystem</u>
                  .
                  <p>
                      (a) The purpose of the Token is to provide access to the Company’s
                      cryptocurrency wallet (the “<b>Ecosystem</b>”). Additional information
                      about the Ecosystem and the Company can be found in the whitepaper
                      available on the Website (the “<b>Whitepaper</b>”).
                  </p>
                  <p>
                      (b) Purchase, ownership, receipt, or possession of Tokens carries no
                      rights, express or implied, other than the right to use Tokens as a means
                      to enable usage of and interaction with the Ecosystem. In particular, you
                      understand and accept that Tokens do not represent or confer any ownership
                      right or stake, share, security, or equivalent rights, or any right to
                      receive future revenue shares, intellectual property rights or any other
                      form of participation in or relating to the Ecosystem and/or Company and
                      its corporate affiliates, other than any rights relating to use of the
                      Ecosystem, subject to these Terms. The Tokens are not intended to be a
                      digital currency, security, commodity, or any kind of financial instrument.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Possible Migration of Tokens</u>
                  .
                  <p>
                      (a) The Tokens are being created on the Wanchain protocol. We reserve the
                  right to migrate the Wanchain protocol Tokens (the “    <b>Pre-existing Tokens</b>”) to another protocol and to generate
                      replacement Tokens on the new protocol (the “<b>Replacement Tokens</b>”) in
                      the future, should we determine, in our sole discretion, that doing so is
                      necessary or useful to the operation of the Ecosystem.
                  </p>
                  <p>
                      (b) Should we decide to migrate the Tokens, we may no longer provide
                      support for the Pre-existing Tokens relating to the Ecosystem or any other
                      operational matters, except with respect to the migration process. Although
                      Company does not at this time anticipate that it will require any
                      Pre-existing Token holders to convert their Pre-existing Tokens to
                      Replacement Tokens, Company anticipates there will be significant
                      incentives for Pre-existing Token owners to do so, since the practical
                      utility of Pre-existing Tokens will likely diminish rapidly once the
                      Replacement Tokens are created and in use by a significant portion of
                      Ecosystem participants. Accordingly, by accepting these Terms you
                      acknowledge and agree that in order for you to continue to participate in
                      the Ecosystem or obtain utility from the Tokens you may need to convert the
                      Tokens you purchase during the Sale to Replacement Tokens in the future.
                  </p>
                  <p>
                      (c) Should we decide to migrate the Tokens, we will notify you via the
                      email address you provided to us at the time of the Sale. You are solely
                      responsible for updating us should your contact information change.
                  </p>
                  <p>
                      (d) We may deem in necessary to migrate the tokens to a new smart-contract
                      on the Wanchain protocol should it be necessary for the improvement of the
                      Token code. If this occurs, all Token holders will automatically receive a
                      new version Replacement Token for each of Pre-existing Token they hold and
                      the Pre-existing Tokens will be deemed invalid going forward. This will be
                      accomplished technically similar to a “fork” and “airdrop.” In the event
                      this occurs, we will manually review all wallets on the blockchain as well
                      as activate a help channel for any questions to create a smooth transition
                      between the smart-contracts. The Replacement Token smart contract will
                      retain the same total token cap and distribution as the prior smart
                      contract.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Scope of Terms</u>
                  .
                  <p>
                      (a) Unless otherwise stated herein, these Terms only govern your purchase
                      of Tokens from Company during the Sale.
                  </p>
                  <p>
                      (b) Any use of Tokens in connection with providing or receiving services in
                      the Ecosystem may be governed by other applicable terms and conditions and
                      policies.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Cancellation; Refusal of Purchase Requests</u>
                  . All purchases of Tokens from us during the Sale are final, and there
                  are no refunds or cancellations except as set forth herein or as may be
                  required by applicable law or regulation. We reserve the right to
                  refuse or cancel Token purchase requests at any time in our sole
                  discretion.
              </li>
              <li style={paragraphStyle}>
                  <u>Token Creation and Allocation</u>
                  . Important information about the Company’s creation and intended use
                  of the Tokens is provided in our Whitepaper which is available via our
                  Website. By purchasing Tokens, you acknowledge that you have read,
                  understand, and have no objection to our Whitepaper.
              </li>
              <li style={paragraphStyle}>
                  <u>Acknowledgment and Assumption of Risks</u>
                  . You acknowledge and agree that there are risks associated with
                  purchasing, owning, and using Tokens for the provision or receipt of
                  services in the Ecosystem, as disclosed and explained in Exhibit A. BY
                  PURCHASING TOKENS, YOU EXPRESSLY ACKNOWLEDGE AND ASSUME THESE RISKS.
              </li>
              <li style={paragraphStyle}>
                  <u>Security</u>
                  . You are responsible for implementing reasonable measures for securing
                  the wallet, vault, or other storage mechanism you use to receive and
                  hold Tokens purchased from us, including any requisite private key(s)
                  or other credentials necessary to access such storage mechanism(s). If
                  your private key(s) or other access credentials are lost, you may lose
                  access to your Tokens. We are not responsible for any losses, costs, or
                  expenses relating to lost access credentials.
              </li>
              <li style={paragraphStyle}>
                  <u>Personal Information</u>
                  . We may determine, in our sole discretion, that it is necessary to
                  obtain certain information about you in order to comply with applicable
                  laws or regulations in connection with selling Tokens to you. You agree
                  to provide us such information promptly upon request and acknowledge
                  that we may refuse to sell Tokens to you until you provide such
                  requested information and we have determined that it is permissible to
                  sell you Tokens under applicable laws or regulations.
              </li>
              <li style={paragraphStyle}>
                  <u>Taxes</u>
                  . Any amounts that you pay for Tokens are exclusive of all applicable
                  taxes. You are responsible for determining what, if any, taxes apply to
                  your purchase of Tokens, including, for example, sales, use, value
                  added, and similar taxes. It is also your responsibility to withhold,
                  collect, report and remit the correct taxes to the appropriate tax
                  authorities. We are not responsible for withholding, collecting,
                  reporting, or remitting any sales, use, value added, or similar tax
                  arising from your purchase of Tokens.
              </li>
              <li style={paragraphStyle}>
                  <u>Representations and Warranties</u>
                  . By sending BCTs to purchase Tokens from us, you represent and warrant
                  that:
                  <p>
                      (a) You have read and understand these Terms (including all referenced
                      documents);
                  </p>
                  <p>
                      (b) YOU ACKNOWLEDGE AND AGREE THAT THERE ARE RISKS ASSOCIATED WITH
                      PURCHASING TOKENS, OWNING TOKENS, AND USING TOKENS FOR THE PROVISION OR
                      RECEIPT OF SERVICES IN THE ECOSYSTEM INCLUDING (BUT NOT NECESSARILY LIMITED
                      TO) THE RISKS DESCRIBED IN EXHIBIT B;
                  </p>
                  <p>
                      (c) You have sufficient understanding of technical and business matters
                      (including those that relate to the Ecosystem), cryptographic tokens, token
                      storage mechanisms (such as token wallets), and blockchain technology to
                      understand these Terms and to appreciate the risks and implications of
                      purchasing Tokens;
                  </p>
                  <p>
                      (d) You understand the restrictions and risks associated with the creation
                      of Tokens as set forth herein, and acknowledge and assume all such risks;
                  </p>
                  <p>
                      (e) You have obtained sufficient information about the Tokens and the
                      Ecosystem to make an informed decision to purchase Tokens;
                  </p>
                  <p>
                      (f) You understand that the Tokens confer only the right to use the
                      Ecosystem (and potentially contribute to the technical development of the
                      Ecosystem), and confer no other rights of any form with respect to the
                      Ecosystem or the Company, including, but not limited to, any ownership,
                      distribution, redemption, liquidation, proprietary (including all forms of
                      intellectual property), or other financial or legal rights;
                  </p>
                  <p>
                      (g) You are purchasing Tokens solely for the purpose of utilizing the
                      features of and participating in the Ecosystem, and supporting the
                      development, testing, deployment, and operation of the Ecosystem, while
                      being aware of the commercial risks associated with the Company and the
                      Ecosystem. You are not purchasing Tokens for any other purposes, including,
                      but not limited to, any investment, speculative, or financial purpose;
                  </p>
                  <p>
                      (h) Your purchase of Tokens complies with applicable laws and regulations
                      in your jurisdiction, including, but not limited to, (i) legal capacity and
                      any other threshold requirements in your jurisdiction for the purchase of
                      the Tokens and entering into contracts with the Company, (ii) any foreign
                      exchange or regulatory restrictions applicable to such purchase, and (iii)
                      any governmental or other consents that may need to be obtained;
                  </p>
                  <p>
                      (i) You will comply with any applicable tax obligations in your
                      jurisdiction arising from your purchase of Tokens;
                  </p>
                  <p>
                      (j) If you are purchasing Tokens on behalf of any entity, you are
                      authorized to accept these Terms on such entity’s behalf and that such
                      entity will be responsible for breach of these Terms by you or any other
                      employee or agent of such entity (references to “you” in these Terms refer
                      to you and such entity, jointly); and
                  </p>
                  <p>
                      (k) You are not (i) a citizen or resident of a geographic area in which
                      access to or use of the Ecosystem or any component of the Ecosystem or the
                      acceptance of delivery of the Tokens is prohibited by applicable law,
                      decree, regulation, treaty, or administrative act including, without
                      limitation, United States, China, and Canada, (ii) a citizen or resident
                      of, or located in, a geographic area that is subject to U.S. or other
                      sovereign country sanctions or embargoes, or (iii) an individual, or an
                      individual employed by or associated with an entity, identified on the U.S.
                      Department of Commerce’s Denied Persons or Entity List, the U.S. Department
                      of Treasury’s Specially Designated Nationals or Blocked Persons Lists, or
                      the U.S. Department of State’s Debarred Parties List. You agree that if
                      your country of residence or other circumstances change such that the above
                      representations are no longer accurate, that you will immediately cease
                      using the Ecosystem. If you are registering to use the Ecosystem on behalf
                      of a legal entity, you further represent and warrant that (i) such legal
                      entity is duly organized and validly existing under the applicable laws of
                      the jurisdiction of its organization, and (ii) you are duly authorized by
                      such legal entity to act on its behalf.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Indemnification</u>
                  .
                  <p>
                      (a) To the fullest extent permitted by applicable law, you will indemnify,
                      defend and hold harmless the Company and our respective past, present and
                      future employees, officers, directors, contractors, consultants, equity
                      holders, suppliers, vendors, service providers, parent companies,
                      subsidiaries, affiliates, agents, representatives, predecessors, successors
                      and assigns (the “<b>Company Parties</b>”) from and against all claims,
                      demands, actions, damages, losses, costs, and expenses (including
                      attorneys’ fees) that arise from or relate to (i) your purchase or use of
                      the Tokens, (ii) your responsibilities or obligations under these Terms,
                      (iii) your violation of these Terms, or (iv) your violation of any rights
                      of any other person or entity.
                  </p>
                  <p>
                      (b) Company reserves the right to exercise sole control over the defense,
                      at your expense, of any claim subject to indemnification under Section
                      14(a). This indemnity is in addition to, and not in lieu of, any other
                      indemnities set forth in a written agreement between you and the Company.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Disclaimers</u>
                  .
                  <p>
                      (a) TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW AND EXCEPT AS
                      OTHERWISE SPECIFIED IN A WRITING BY US, (A) THE TOKENS ARE SOLD ON AN “AS
                      IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, AND WE
                      EXPRESSLY DISCLAIM ALL IMPLIED WARRANTIES AS TO THE TOKENS, INCLUDING,
                      WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                      PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT, (B) WE DO NOT REPRESENT OR
                      WARRANT THAT THE TOKENS ARE RELIABLE, CURRENT OR ERROR-FREE, MEET YOUR
                      REQUIREMENTS, OR THAT DEFECTS IN THE TOKENS WILL BE CORRECTED, AND (C) WE
                      CANNOT AND DO NOT REPRESENT OR WARRANT THAT THE TOKENS OR THE DELIVERY
                      MECHANISM FOR TOKENS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                  </p>
                  <p>
                      (b) Some jurisdictions do not allow the exclusion of certain warranties or
                      disclaimer of implied terms in contracts with consumers, so some or all of
                      the exclusions of warranties and disclaimers in this Section 15 may not
                      apply to you.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Limitation of Liability</u>
                  .
                  <p>
                      (a) TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW (I) IN NO EVENT WILL
                      THE COMPANY OR ANY OF THE COMPANY PARTIES BE LIABLE FOR ANY INDIRECT,
                      SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES OF ANY KIND
                      (INCLUDING, BUT NOT LIMITED TO, WHERE RELATED TO LOSS OF REVENUE, INCOME OR
                      PROFITS, LOSS OF USE OR DATA, OR DAMAGES FOR BUSINESS INTERRUPTION) ARISING
                      OUT OF OR IN ANY WAY RELATED TO THE SALE OR USE OF THE TOKENS OR OTHERWISE
                      RELATED TO THESE TERMS, REGARDLESS OF THE FORM OF ACTION, WHETHER BASED IN
                      CONTRACT, TORT (INCLUDING, BUT NOT LIMITED TO, SIMPLE NEGLIGENCE, WHETHER
                      ACTIVE, PASSIVE OR IMPUTED), OR ANY OTHER LEGAL OR EQUITABLE THEORY (EVEN
                      IF THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND
                      REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE), AND (II) IN NO EVENT
                      WILL THE AGGREGATE LIABILITY OF THE COMPANY AND THE COMPANY PARTIES
                      (JOINTLY), WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE,
                      WHETHER ACTIVE, PASSIVE OR IMPUTED), OR OTHER THEORY, ARISING OUT OF OR
                      RELATING TO THESE TERMS OR THE USE OF OR INABILITY TO USE THE DCs, EXCEED
                      THE AMOUNT YOU PAY TO US FOR THE DCs.
                  </p>
                  <p>
                      (b) THE LIMITATIONS SET FORTH IN SECTION 16(a) WILL NOT LIMIT OR EXCLUDE
                      LIABILITY FOR THE GROSS NEGLIGENCE, FRAUD OR INTENTIONAL, WILLFUL OR
                      RECKLESS MISCONDUCT OF THE COMPANY.
                  </p>
                  <p>
                      (c) Some jurisdictions do not allow the limitation or exclusion of
                      liability for incidental or consequential damages. Accordingly, some of the
                      limitations of this Section 16 may not apply to you.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <u>Release</u>
                  . To the fullest extent permitted by applicable law, you release the
                  Company and the other Company Parties from responsibility, liability,
                  claims, demands, and/or damages (actual and consequential) of every
                  kind and nature, known and unknown (including, but not limited to,
                  claims of negligence), arising out of or related to disputes between
                  participants in the Ecosystem and the acts or omissions of any third
                  parties. You expressly waive any rights you may have under any statute
                  or common law principle that would otherwise limit the coverage of this
                  release to include only those claims which you may know or suspect to
                  exist in your favor at the time of agreeing to this release.
              </li>
              <li style={paragraphStyle}>
                  <u>Dispute Resolution; Arbitration</u>
                  .
                  <p>
                      (a) <u>Binding Arbitration</u>. Except for any disputes, claims, suits,
                  actions, causes of action, demands or proceedings (collectively, “    <b>Disputes</b>”) in which either Party seeks to bring an individual action
                      in small claims court or seeks injunctive or other equitable relief for the
                      alleged unlawful use of intellectual property, including, without
                      limitation, copyrights, trademarks, trade names, logos, trade secrets or
                      patents, you and the Company (i) waive your and the Company’s respective
                      rights to have any and all Disputes arising from or related to these Terms
                      resolved in a court, and (ii) waive your and the Company’s respective
                      rights to a jury trial. Instead, you and the Company will arbitrate
                      Disputes through binding arbitration (which is the referral of a Dispute to
                      one or more persons charged with reviewing the Dispute and making a final
                      and binding determination to resolve it instead of having the Dispute
                      decided by a judge or jury in court).
                  </p>
                  <p>
                      (b) <u>No Class Arbitrations, Class Actions or Representative Actions</u>.
                      Any Dispute arising out of or related to these Terms is personal to you and
                      the Company and will be resolved solely through individual arbitration and
                      will not be brought as a class arbitration, class action or any other type
                      of representative proceeding. There will be no class arbitration or
                      arbitration in which an individual attempts to resolve a Dispute as a
                      representative of another individual or group of individuals. Further, a
                      Dispute cannot be brought as a class or other type of representative
                      action, whether within or outside of arbitration, or on behalf of any other
                      individual or group of individuals.
                  </p>
                  <p>
                      (c) <u>Notice; Informal Dispute Resolution</u>. Each Party will notify the
                      other Party in writing of any arbitrable or small claims Dispute within
                      thirty (30) days of the date it arises, so that the Parties can attempt in
                      good faith to resolve the Dispute informally. Notice to the Company shall
                      be sent by e-mail to the Company at support@cryptocurve.io. Notice to you
                      shall be by email to the email address you provide to us. Your notice must
                      include (i) your name, postal address, email address and telephone number,
                      (ii) a description in reasonable detail of the nature or basis of the
                      Dispute, and (iii) the specific relief that you are seeking. If you and the
                      Company cannot agree how to resolve the Dispute within thirty (30) days
                      after the date notice is received by the applicable Party, then either you
                      or the Company may, as appropriate and in accordance with this Section 18,
                      commence an arbitration proceeding or, to the extent specifically provided
                      for in Section 18(a), file a claim in court.
                  </p>
                  <p>
                      <a name="_Hlk510775540">(d) <u>Process</u></a>
                      .
                      <a name="_Hlk510775825">
                          Any arbitration will occur in Amsterdam, The Netherlands. Arbitration
                          will be conducted confidentially by a single arbitrator in accordance
                  with the rules of the Judicial Arbitration and Mediation Services (“<b>JAMS</b>”), which are hereby incorporated by reference. The relevant
                          courts of The Netherlands will have exclusive jurisdiction over any
                          appeals and the enforcement of an arbitration award.
                      </a>
                  </p>
                  <p>
                      (e) <u>Authority of Arbitrator</u>. As limited by these Terms, and the
                      applicable JAMS rules, the arbitrator will have (i) the exclusive authority
                      and jurisdiction to make all procedural and substantive decisions regarding
                      a Dispute, including the determination of whether a Dispute is arbitrable,
                      and (ii) the authority to grant any remedy that would otherwise be
                      available in court; provided, however, that the arbitrator does not have
                      the authority to conduct a class arbitration or a representative action,
                      which is prohibited by these Terms. The arbitrator may only conduct an
                      individual arbitration and may not consolidate more than one individual’s
                      claims, preside over any type of class or representative proceeding or
                      preside over any proceeding involving more than one individual.
                  </p>
                  <p>
                      (f) <u>Rules of JAMS</u>. The rules of JAMS and additional information
                      about JAMS are available on the JAMS website. By agreeing to be bound by
                      these Terms, you either (i) acknowledge and agree that you have read and
                      understand the rules of JAMS, or (ii) waive your opportunity to read the
                      rules of JAMS and any claim that the rules of JAMS are unfair or should not
                      apply for any reason.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <a name="_Hlk510775626"><u>Governing Law and Venue</u></a>
                  . These Terms will be governed by and construed and enforced in
                  accordance with the laws of The Netherlands.
              </li>
              <li style={paragraphStyle}>
                  <u>Severability</u>
                  . If any term, clause or provision of these Terms is held unlawful,
                  void, or unenforceable, then that term, clause or provision will be
                  severable from these Terms and will not affect the validity or
                  enforceability of any remaining part of that term, clause or provision,
                  or any other term, clause or provision of these Terms.
              </li>
              <li style={paragraphStyle}>
                  <u>Miscellaneous</u>
                  . These Terms constitute the entire agreement between you and us
                  relating to your purchase of Tokens from us. We may assign our rights
                  and obligations under these Terms. Our failure to exercise or enforce
                  any right or provision of these Terms will not operate as a waiver of
                  such right or provision. We will not be liable for any delay or failure
                  to perform any obligation under these Terms where the delay or failure
                  results from any cause beyond our reasonable control. Purchasing Tokens
                  from us does not create any form of partnership, joint venture, or any
                  other similar relationship between you and us. Except as otherwise
                  provided in herein, these Terms are intended solely for the benefit of
                  you and us and are not intended to confer third-party beneficiary
                  rights upon any other person or entity. You agree and acknowledge that
                  all agreements, notices, disclosures, and other communications that we
                  provide to you, including these Terms, will be provided in electronic
                  form.
              </li>
          </ol>
          <b>
              <br clear="all"/>
          </b>
          <p align="center">
              <b>EXHIBIT A</b>
          </p>
          <p align="center">
              <b>Risk Factors</b>
          </p>
          <p style={paragraphStyle}>
              Certain Risks Relating to Purchase, Sale, and Use of Tokens. Important
              Note: As noted elsewhere in these Terms, the Tokens are not being
              structured or sold as securities or any other form of investment product.
              Accordingly, none of the information presented in this Whitepaper is
              intended to form the basis for any investment decision, and no specific
              recommendations are intended. The Company expressly disclaims any and all
              responsibility for any direct or consequential loss or damage of any kind
              whatsoever arising directly or indirectly from: (i) reliance on any
              information contained herein, (ii) any error, omission or inaccuracy in any
              such information or (iii) any action resulting from such information. By
              purchasing, owning, and using Tokens, you expressly acknowledge and assume
              the following risks:
          </p>
          <ol start="1" type="1">
              <li style={paragraphStyle}>
                  <p>
                      <u>
                          Risk of Losing Access to Tokens Due to Loss of Private Key(s),
                          Custodial Error or your Error
                      </u>
                      A private key, or a combination of private keys, is necessary to control
                      and dispose of Tokens stored in your digital wallet or vault. Accordingly,
                      loss of requisite private key(s) associated with your digital wallet or
                      vault storing Tokens will result in loss of such Tokens. Moreover, any
                      third party that gains access to such private key(s), including by gaining
                      access to login credentials of a hosted wallet service you use, may be able
                      to misappropriate your Tokens. Any errors or malfunctions caused by or
                      otherwise related to the digital wallet or vault you choose to receive and
                      store Tokens, including your own failure to properly maintain or use such
                      digital wallet or vault, may also result in the loss of your Tokens.
                      Additionally, your failure to precisely follow the procedures set forth in
                      for buying and receiving Tokens, including, for instance, if you provide an
                      incorrect Coin Receipt Address, or provides an address that is not Wanchain
                      protocol compatible, may result in the loss of your Tokens.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Associated with the Ethereum Protocol</u>. Because Tokens and
                      the Ecosystem are based on the Wanchain protocol, any malfunction,
                      breakdown or abandonment of the Wanchain protocol may have a material
                      adverse effect on the Ecosystem or Tokens. Moreover, advances in
                      cryptography, or technical advances such as the development of quantum
                      computing, could present risks to the Tokens and the Ecosystem, including
                      the utility of the Tokens for obtaining services within the Ecosystem, by
                      rendering ineffective the cryptographic consensus mechanism that underpins
                      the Ethereum protocol.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of Mining Attacks</u>. As with other decentralized cryptographic
                      Tokens based on the Wanchain protocol, the Tokens are susceptible to
                      attacks by miners in the course of validating Coin transactions on the
                      Wanchain blockchain, including, but not limited, to double-spend attacks,
                      majority mining power attacks, and selfish-mining attacks. Any successful
                      attacks present a risk to the Ecosystem and the Tokens, including, but not
                      limited to, accurate execution and recording of transactions involving
                      Tokens.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of Hacking and Security Weaknesses</u>. Hackers or other
                      malicious groups or organizations may attempt to interfere with the
                      Ecosystem or the Tokens in a variety of ways, including, but not limited
                      to, malware attacks, denial of service attacks, consensus-based attacks,
                      Sybil attacks, smurfing and spoofing. Furthermore, because the Ecosystem is
                      based on open-source software, there is a risk that a third party or a
                      member of the Company team may intentionally or unintentionally introduce
                      weaknesses into the core infrastructure of the Ecosystem, which could
                      negatively affect the Ecosystem and the Tokens, including the utility of
                      the Tokens for obtaining services within the Ecosystem.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Associated with Markets for Tokens</u>. The Tokens are intended
                      to be used solely within the Ecosystem and the Company will not support or
                      otherwise facilitate any secondary trading or external valuation of Tokens.
                      This restricts the contemplated avenues for using Tokens to the provision
                      or receipt of services within the Ecosystem and could therefore create
                      illiquidity risk with respect to any Tokens you own. Even if secondary
                      trading of Tokens is facilitated by third-party exchanges, such exchanges
                      may be relatively new and subject to little or no regulatory oversight,
                      making them more susceptible to fraud or manipulation. Furthermore, to the
                      extent that third parties do ascribe an external exchange value to Tokens
                      (e.g., as denominated in a digital or fiat currency), such value may be
                      extremely volatile and diminish to zero.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of Uninsured Losses</u>. Unlike bank accounts or accounts at
                      some other financial institutions, Tokens are uninsured unless you
                      specifically obtain private insurance to insure them. Thus, in the event of
                      loss or loss of utility value, there is no public insurer, such as the
                      Federal Deposit Insurance Corporation, or private insurance arranged by
                      Company, to offer recourse to you.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Associated with Uncertain Regulations and Enforcement Actions</u>.
                      The regulatory status of the Tokens and distributed ledger technology is
                      unclear or unsettled in many jurisdictions. It is difficult to predict how
                      or whether regulatory agencies may apply existing regulation with respect
                      to such technology and its applications, including the Ecosystem and the
                      Tokens. It is likewise difficult to predict how or whether legislatures or
                      regulatory agencies may implement changes to law and regulation affecting
                      distributed ledger technology and its applications, including the Ecosystem
                      and the Tokens. Regulatory actions could negatively impact the Ecosystem
                      and the Tokens in various ways, including, for purposes of illustration
                      only, through a determination that the purchase, sale and delivery of the
                      Tokens constitutes unlawful activity or that the Tokens are a regulated
                      instrument that require registration or licensing of those instruments or
                      some or all of the parties involved in the purchase, sale and delivery
                      thereof. The Company may cease operations in a jurisdiction in the event
                      that regulatory actions, or changes to law or regulation, make it illegal
                      to operate in such jurisdiction, or commercially undesirable to obtain the
                      necessary regulatory approval(s) to operate in such jurisdiction.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Arising from Taxation</u>. The tax characterization of Tokens
                      is uncertain. You must seek your own tax advice in connection with
                      purchasing Tokens, which may result in adverse tax consequences to you,
                      including withholding taxes, income taxes and tax reporting requirements.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of Competing Ecosystems</u>. It is possible that alternative
                      ecosystems could be established that utilize the same open source code and
                      protocol underlying the Ecosystem and attempt to facilitate services that
                      are materially similar to those provided by or in connection with the
                      Ecosystem. The Ecosystem may compete with these alternatives, which could
                      negatively impact the Ecosystem and Tokens, including the utility of the
                      Tokens for obtaining services within the Ecosystem.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>
                          Risk of Insufficient Interest in the Ecosystem or Distributed
                          Applications
                      </u>
                      . It is possible that the Ecosystem will not be used by a large number of
                      individuals, companies and other entities or that there will be limited
                      public interest in the creation and development of distributed ecosystems
                      (such as the Ecosystem) more generally. Such a lack of use or interest
                      could negatively impact the development of the Ecosystem and therefore the
                      potential utility of the Tokens, including the utility of the Tokens for
                      obtaining services within the Ecosystem.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>
                          Risks Associated with the Development and Maintenance of the Ecosystem
                      </u>
                      . The Ecosystem is still under development and may undergo significant
                      changes over time. Although we intend for the Tokens and Ecosystem to
                      function and intend to take commercially reasonable steps toward those
                      ends, we may have to make changes to the specifications of the Tokens or
                      Ecosystem for any number of legitimate reasons. Moreover, we have no
                      control over how other participants will use the Ecosystem, what products
                      or services will be offered through the Ecosystem by third parties, or how
                      third-party products and services will utilize Tokens (if at all). This
                      could create the risk that the Tokens or Ecosystem, as further developed
                      and maintained, may not meet your expectations at the time of purchase.
                      Furthermore, despite our good faith efforts to develop and participate in
                      the Ecosystem, it is still possible that the Ecosystem will experience
                      malfunctions or otherwise fail to be adequately developed or maintained,
                      which may negatively impact the Ecosystem and Tokens, and the potential
                      utility of the Tokens, including the utility of the Tokens for obtaining
                      services within the Ecosystem.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of an Unfavorable Fluctuation of BCT Value</u>. If the value of
                      ETH or WAN fluctuates unfavorably during or after the Sale, we may not be
                      able to fund development, or may not be able to develop or maintain the
                      Ecosystem in the manner that it intended. In addition to the usual market
                      forces, there are several potential events which could exacerbate the risk
                      of unfavorable fluctuation in the value of ETH and/or WAN, including
                      uncertainties created by the lack of resolution to the bitcoin scaling
                      debate, the possibility of a so-called “Hard Fork” of bitcoin if one of the
                      competing camps in the scaling debate decides to force the issue; another
                      DAO-like attack on the Ethereum or Wanchain network; or significant
                      security incidents or market irregularities at one or more of the major
                      cryptocurrency exchanges.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risk of Dissolution of the Company or Ecosystem</u>. It is possible
                      that, due to any number of reasons, including, but not limited to, an
                      unfavorable fluctuation in the value of ETH and/or WAN (or other
                      cryptographic and fiat currencies), decrease in the Tokens’ utility
                      (including their utility for obtaining services within the Ecosystem), the
                      failure of commercial relationships, or intellectual property ownership
                      challenges, the Ecosystem may no longer be viable to operate or the Company
                      may dissolve.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Arising from Lack of Governance Rights</u>. Because Tokens
                      confer no governance rights of any kind with respect to the Ecosystem or
                      the Company, all decisions involving the Company’s products or services
                      within the Ecosystem or the Company itself will be made by the Company at
                      its sole discretion, including, but not limited to, decisions to
                      discontinue its products or services in the Ecosystem, to create and sell
                      more Tokens for use in the Ecosystem, or to sell or liquidate the Company.
                      These decisions could adversely affect the Ecosystem and the utility of any
                      Tokens you own, including their utility for obtaining services within the
                      Ecosystem.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Unanticipated Risks</u>. Cryptographic Tokens such as the Tokens are
                      a new and untested technology. In addition to the risks included herein,
                      there are other risks associated with your purchase, possession, and use of
                      the Tokens, including unanticipated risks. Such risks may further
                      materialize as unanticipated variations or combinations of the risks
                      discussed in this document.
                  </p>
              </li>
              <li style={paragraphStyle}>
                  <p>
                      <u>Risks Arising from Copyright Infringement</u>. It is our intent to
                      partner with firms to protect content rights. However, there is no way to
                      fully ensure indemnification from claims that may or may not have any basis
                      in fact. Such claims could result in negative press for the company, which
                      could negatively impact the Ecosystem and Tokens, including the utility of
                      the Tokens for obtaining services within the Ecosystem.
                  </p>
              </li>
          </ol>
        </DialogContent>
        <DialogActions>
          <Button style={{border: '1px solid #ccc'}} onClick={this.props.handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default (TermsModal);
