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

import { Sha256 } from 'lib/crypto';

interface Data {
    account: string;
    name: string;
    meetingID: string;
    file: ArrayBuffer;
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export default async function(data: Data) {
    const hash = await Sha256(data.file);
    const blobHash = arrayBufferToBase64(hash);
    const name = `${data.account}_${data.name}_${data.meetingID}`;
    const outFile = new File([data.file], name);

    const body = new FormData();
    body.append('ACTION', 'SEND_PDF');
    body.append('CredentialKey', 'default');
    body.append('SendAuto', 'false');
    body.append('prefixId', 'PARAM');
    body.append('ConsumerServiceURL', location.href);
    body.append('Issuer', 'https://parametrized.LuxTrust.lu');
    body.append(
        'FrontURL',
        'https://orely.luxtrust.com/FederatedServiceFrontEnd'
    );
    body.append('FrontEndPoint', '/saml/dss/req');
    body.append('DSSPayload', '');
    body.append(
        'XMLDocURI',
        'urn:lu.luxtrust.tspserviceprovider:files:pdf:fileName'
    );
    body.append('XMLDocHash', blobHash);
    body.append('SignatureForm', 'T');
    body.append('CommitmentType', 'ProofOfApproval');
    body.append('SignatureOID', '1.3.171.1.4.1.1.1');
    body.append('lang', 'EN');
    body.append('minQAA', '4');
    body.append('tspId', '-');
    body.append('tspType', '-');
    body.append('SharedProvider', '');
    body.append('tspMode', 'FULL');
    body.append('subjectID', '');
    body.append(
        'challenge',
        'PENoYWxsZW5nZVN0cnVjdHVyZT48VHlwZT5WQVNDTzwvVHlwZT48VmVyc2lvbj4xLjA8L1ZlcnNpb24+PFRpdGxlPkxIT0ZUPC9UaXRsZT48T3BlcmF0aW9uPlNJR048L09wZXJhdGlvbj48S2V5VmFsdWVzPjxLZXlWYWx1ZT48S2V5PkFDVElPTjwvS2V5PjxWYWx1ZSBjb2xvcj0iZGVmYXVsdCI+U0lHTkFUVVJFPC9WYWx1ZT48L0tleVZhbHVlPjwvS2V5VmFsdWVzPjwvQ2hhbGxlbmdlU3RydWN0dXJlPg=='
    );
    body.append('ReqFullCertificate', 'NONE');
    body.append('RelayState', '');
    body.append('PDFFile', outFile);

    const response = await fetch('https://lhoft.apla.io/SPServlet', {
        method: 'POST',
        body
    });

    const text = await response.text();

    const startToken = '<input type="hidden" name="SAMLRequest" value="';
    const endToken = '" />';
    const startIndex = text.indexOf(startToken) + startToken.length;
    const result = text
        .slice(startIndex, text.indexOf(endToken, startIndex))
        .replace(/\n/g, '');
    (window as any).a = result;
    return result;
}
