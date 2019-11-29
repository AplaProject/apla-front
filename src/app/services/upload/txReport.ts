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

interface Data {
    // Third-party data
    meetingID: string;
    agenda: string;
    company: string;
    category: string;
    title: string;
    duration: string;
    question: string;
    decision: string;
    comments: string;
    proxy: string;

    // Self-generated
    networkID: number;
    account: string;
    hash: string;
    blockID: string;
    params: string;
    blockTime: number;
    attachments: string[];
}

type Response =
    | {
          success: true;
          key: string;
      }
    | {
          success: false;
      };

export default async function(data: Data): Promise<Response> {
    const [date, time] = new Date().toISOString().split('T');
    const [blockDate, blockTime] = new Date(data.blockTime * 1000)
        .toISOString()
        .split('T');
    const senderAccount =
        !data.proxy || 24 !== data.proxy.trim().length
            ? data.account
            : data.proxy;
    const response = await fetch(
        'https://apla-relay-lt.now.sh/api/relayPDFTx',
        {
            method: 'POST',
            body: new URLSearchParams({
                networkID: data.networkID,
                version: process.env.REACT_APP_VERSION || 'x.x.x',
                reportID: `${senderAccount}_${data.meetingID}_${data.agenda}`,
                account: data.account,
                date,
                time,
                company: data.company,
                category: data.category,
                title: data.title,
                duration: data.duration,
                question: data.question,
                decision: data.decision,
                attachment: data.attachments.join('\n') || '-',
                comments: data.comments,
                proxy: data.proxy,
                hash: data.hash,
                blockID: data.blockID,
                blockDate: blockDate,
                blockTime: blockTime,
                params: data.params || '{}'
            } as any)
        }
    );
    return await response.json();
}
