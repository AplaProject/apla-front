// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import Button from 'components/Form/Button';

import Modal from './';
import ModalWindow from 'containers/Modal/ModalWindow';
import themed from 'components/Theme/themed';

const LegalView = themed.div`
    overflow-y: scroll;
    overflow-x: hidden;
    border: solid 1px #eeeeee;
    background: #fff;
    color: #000;
    max-height: 60vh;
    max-width 60vh;

    ul,ol {
        padding: 0 0 0 25px;
        margin: 0;

        > li {
            margin-bottom: 20px;
        }
    }

    span.block {
        display: block;
    }
`;

class LegalModal extends Modal<void, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="License agreement"
                controls={
                    <>
                        <Button
                            block
                            color="link"
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            block
                            color="primary"
                            onClick={() => this.props.onResult(null)}
                        >
                            Accept
                        </Button>
                    </>
                }
            >
                <LegalView>
                    <h4>
                        <center>End User Apla X-REG Software License</center>
                    </h4>
                    <h5>Definitions:</h5>
                    <p>
                        Unless the context requires otherwise, the following
                        terms shall be used in this software license agreement:
                    </p>
                    <p>
                        <strong>“Account”</strong> means a user data set that
                        authenticates the user in Apla Software;
                    </p>
                    <p>
                        <strong>“Apla Luxembourg”</strong>, or “us”, or “we”
                        means EGAAS S.A., a legal entity established under the
                        laws of the Grand Duchy of Luxembourg, registered with
                        RCS Luxembourg under the number B216352 at the following
                        address: L-1273 Luxembourg, 20 rue de Bitbourg;
                    </p>
                    <p>
                        <strong>“Apla Software”</strong> means the e-voting and
                        digital signing software solution developed and made
                        available to you by Apla Luxembourg, as defined in more
                        detail in the Apla end user manual;
                    </p>
                    <p>
                        <strong>“Corporate Service Provider”</strong> means a
                        legal entity that renders you and/ or your company data
                        storage, operation processing and other services with
                        the use of Apla Software under the terms of Apla
                        commercial software license;
                    </p>
                    <p>
                        <strong>“End User”</strong> or <strong>“you”</strong>{' '}
                        means a legal entity or individual that has an Account
                        and use Apla Software under the terms of the Apla End
                        User Software License;
                    </p>
                    <p>
                        <strong>“LuxTrust”</strong> is a third party qualified
                        digital identity provider based in Luxembourg (
                        <a
                            href="https://www.luxtrust.lu"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.luxtrust.lu
                        </a>
                        ). In the course of using Apla Software, you will be
                        able to perform digital signing operations with your
                        LuxTrust token if this service is made available to you
                        by your company or Corporate Service Provider;
                    </p>
                    <p>
                        <strong>“Private key”</strong> is a secret component of
                        the cryptographic algorithm that is used together with a
                        public key to gain access to Account or to sign
                        electronic transactions;
                    </p>
                    <p>
                        <strong>“Your company”</strong> means an entity in which
                        you serve as a board member or have the shareholder
                        status.
                    </p>
                    <p>
                        By continuing the account creation process, you
                        acknowledge and agree with the below terms and
                        conditions of this end user license agreement:  
                    </p>

                    <ol>
                        <li>
                            <strong>License Grant.</strong> We (Apla Luxembourg)
                            grant you, the end user, a non-exclusive,
                            non-transferable and free-of-charge license to use
                            the Apla Software in the manner described in the
                            Apla end user manual, for your internal business
                            under the terms and conditions stated herein.
                        </li>
                         
                        <li>
                            <strong>Permissible Use.</strong> You may use Apla
                            Software for as long as your company or Corporate
                            Service Provider engaged by your company maintains a
                            valid commercial software license agreement with us.
                        </li>
                        <li>
                            <strong>Prohibited Use.</strong> You may not (a)
                            provide commercial services, sell, sublicense, rent
                            or lease the Apla Software to another party without
                            purchasing the specific Apla commercial license to
                            do so, (b) decompile, disassemble, reverse engineer
                            or modify in any manner, any of the Apla Software
                            (except to the extent such prohibition is expressly
                            prohibited by law), (c) use the Apla Software in
                            violation of any applicable laws or regulations, or
                            (d) make available the Apla Software or your license
                            file on any type of public sharing website or
                            forums.
                        </li>
                        <li>
                            <strong>Maintenance and Support.</strong> We have no
                            obligation to support, maintain or provide any
                            assistance directly to you under this license.
                            Please address all your queries to and seek
                            assistance from your company as regards any issues
                            you may have in connection with your use of Apla
                            Software. In no event will Apla Luxembourg be liable
                            for any damages for any claim or cause for any
                            direct, actual, indirect damages, loss of data,
                            consequential, incidental or special indirect
                            damages as a result of or in connection with your
                            use of the Apla Software.      
                        </li>
                        <li>
                            <strong>Technical Information Collection.</strong>{' '}
                            You agree that we may, if instructed by your company
                            or Corporate Service Provider engaged by your
                            company, for the purposes of fixing technical issues
                            and improving the Apla Software, collect, process
                            and use technical and other personal information
                            that is gathered as part of any product maintenance
                            and support services. By providing this data and
                            information to us, you consent to Apla Luxembourg’s
                            storage and processing of such information for
                            indicated purposes. 
                        </li>
                        <li>
                            <strong>Intellectual Property Rights.</strong> All
                            right, title and interest to the intellectual
                            property rights in and to the Apla Software, and any
                            copies that you are permitted to make, are owned by
                            Apla Luxembourg and / or its licensors and is
                            protected by copyright, trade secret and other laws
                            and international treaties. This Apla Software is
                            LICENSED, NOT SOLD. Certain trademarks and logos
                            used in the Apla software are protected or will be
                            protected by trademarks.
                        </li>
                        <li>
                            <strong>Digital Signing Operations</strong>
                            <p>
                                <em>Signing by your private keys</em>
                            </p>
                            <p>
                                In the course of using Apla Software, your
                                activities (eg., voting, etc) will be recorded
                                in the system as electronic transactions
                                (“electronic transactions”). Electronic
                                transactions, which are called by you, will be
                                signed by your private key generated and stored
                                on your device at the time of the Account
                                creation. We have integrated the Digital
                                Signature Algorithm named ECDSA for generating
                                private keys and authenticating their owners
                                upon signing electronic transactions. 
                            </p>
                            <p>
                                Upon singing up for a new Account, you
                                acknowledge and confirm that:
                            </p>
                            <ul>
                                <li>
                                    you will be solely responsible for a safe
                                    custody of the private key generated on your
                                    device;
                                </li>
                                <li>
                                    a signature by your private key shall be as
                                    legally valid and binding upon you as your
                                    original handwritten signature on a paper
                                    document;
                                </li>
                                <li>
                                    electronic transactions signed by your
                                    private key, including electronic documents,
                                    shall be deemed (i) to be “written” or “in
                                    writing,” (ii) to have been signed and (iii)
                                    to constitute a record established and
                                    maintained in the ordinary course of
                                    business and an original written record when
                                    printed from electronic files; 
                                </li>
                                <li>
                                    transaction reports, paper copies or
                                    “printouts,” can be introduced as evidence
                                    in any judicial, arbitral, mediation or
                                    administrative proceeding, and you will
                                    agree to accept them as being admissible to
                                    the same extent and under the same
                                    conditions as other original business
                                    records created and maintained in
                                    documentary form;
                                </li>
                                <li>
                                    you shall not contest the admissibility of
                                    true and accurate copies of documents signed
                                    by your private key on the basis of the best
                                    evidence rule or as not satisfying the
                                    business records exception to the hearsay
                                    rule.
                                </li>
                            </ul>
                            <p>
                                <em>Legal effects of electronic signatures</em>
                            </p>
                            <p>
                                Signing electronic transactions by your private
                                key is not treated as a qualified signature
                                under EU law.
                            </p>
                            <p>
                                Nevertheless, according to Article 5 of the EU
                                Directive 1999/93/EC on a Community framework
                                for electronic signatures,
                            </p>
                            <p>
                                “Member States shall ensure that an electronic
                                signature is not denied legal effectiveness and
                                admissibility as evidence in legal proceedings
                                solely on the grounds that it is:
                            </p>
                            <p>
                                <span className="block">— in electronic form, or</span>
                                <span className="block">
                                    — not based upon a qualified certificate, or
                                </span>
                                <span className="block">
                                    — not based upon a qualified certificate
                                    issued by an accredited
                                    certification-service-provider, or
                                </span>
                                <span className="block">
                                    — not created by a secure signature-creation
                                    device.”
                                </span>
                            </p>
                            <p>
                                You may want to seek a legal advice of your
                                lawyers to verify the legally binding effect of
                                signing by your private key under the law of
                                your jurisdiction.
                            </p>
                            <p>
                                <em>LuxTrust qualified signature</em>
                            </p>
                            <p>
                                At the time of your account creation, you will
                                be able to authenticate your account with your
                                LuxTrust token or mobile signature.
                            </p>
                               
                            <p>
                                If the LuxTrust service is enabled by your
                                company, you can sign proxy and other meeting
                                documents by your LuxTrust signature.  
                            </p>
                             
                            <p>
                                Signing by your LuxTrust signature will be
                                legally binding and have the same effect as your
                                handwritten signature on a paper document.
                            </p>
                        </li>
                        <li>
                            <strong>Data privacy</strong>
                            <p>
                                Your personal data collected during the account
                                registration process will be directly sent to
                                and stored on servers of either your company or
                                Corporate Service Provider engaged by your
                                company. All meeting documents and other
                                information will be stored on servers of either
                                your company or Corporate Service Provider
                                engaged by your company. Any restriction on you
                                accessing certain information or documents, can
                                be established by your company only. Your
                                company will be fully responsible for making
                                arrangements to secure access to and storage of
                                meeting documents and your personal data. For
                                the purposes of protecting your vote casting
                                choices from illegal tampering or loss, hashes
                                of your vote casting transactions will be
                                time-stamped and stored in Apla Consortium
                                Chain. A hash will not contain personal data or
                                other sensitive information.
                            </p>
                        </li>
                        <li>
                            <strong>Data security and immutability</strong>
                            <p>
                                The Apla X-REG solution deploys the blockchain
                                technology developed by Apla Luxembourg for
                                making your vote casting immutable. A hash of
                                your vote casting transaction will be
                                time-stamped, saved and stored in Apla
                                Consortium Chain.
                            </p>
                             
                            <p>
                                Follow the link below to check if the hash of
                                your vote casting transaction has been saved in
                                the Apla Consortium Chain: 
                                <a
                                    href="https://explore.consortium-network.org/"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    https://explore.consortium-network.org/
                                </a>
                            </p>
                            <p>
                                We recommend you saving all vote casting reports
                                on your device for future references. In case of
                                loss, damage or illegal tampering of your vote
                                casting choices, you will be able to match the
                                data in the report with its hash stored in the
                                Apla Consortium Chain in order to prove your
                                actual vote casting.
                            </p>
                        </li>
                        <li>
                            <strong>Limitation of Liability.</strong> THE APLA
                            X-REG SOFTWARE IS PROVIDED 'AS IS”, WITHOUT WARRANTY
                            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT
                            LIMITATION ANY IMPLIED WARRANTY THAT THE SOFTWARE IS
                            FREE OF DEFECTS, MERCHANTABLE OR FIT FOR A
                            PARTICULAR PURPOSE. NO ORAL OR WRITTEN INFORMATION
                            OR ADVICE GIVEN BY APLA LUXEMBOURG OR ANY THIRD
                            PARTY, INCLUDING, WITHOUT LIMITATION, ANY APLA
                            LUXEMBOURG DISTRIBUTORS OR RESELLERS, SHALL CREATE
                            ANY WARRANTY. In no event will Apla Luxembourg, its
                            affiliates, distributors or resellers be liable for
                            any indirect, special, incidental or consequential
                            damages arising out of the use of or inability to
                            use the Apla X-REG Software, including, without
                            limitation, damages for lost profits, loss of
                            goodwill, work stoppage, computer failure or
                            malfunction, or any and all other commercial damages
                            or losses, even if advised of the possibility
                            thereof.
                        </li>
                        <li>
                            <strong>General.</strong> If any provision of this
                            End User License is found illegal or unenforceable,
                            it will be enforced to the maximum extent
                            permissible, and the legality and enforceability of
                            the other provisions hereof will not be affected.
                            This End-User License will be governed by the laws
                            of the Grand Duchy of Luxembourg, without regard to
                            its choice of law principles. You agree that
                            exclusive jurisdiction for any claim or dispute
                            arising out of or in connection with this End User
                            License resides in the Courts of the Grand Duchy of
                            Luxembourg.
                        </li>
                        <li>
                            <strong>Contact Information</strong>
                            <p>
                                If you have any queries as regards this license,
                                please send us an email to{' '}
                                <a
                                    href="mailto:luxembourg@apla.io"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    luxembourg@apla.io
                                </a>
                            </p>
                        </li>
                    </ol>
                </LegalView>
            </ModalWindow>
        );
    }
}
export default LegalModal;
