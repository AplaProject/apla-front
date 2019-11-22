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

export const sendAttachment = (filename: string, data: string | ArrayBuffer, mime = 'text/plain') => {
    const blob = new Blob([data], { type: `${mime};charset=utf-8;` });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    }
    else {
        const link = document.createElement('a');
        link.setAttribute('download', filename);
        link.setAttribute('style', 'display:none');
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

export const readTextFile = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedFile = (e.target as any).result;
            loadedFile ? resolve(loadedFile) : reject();
        };
        reader.readAsText(file);
    });
};

export const readBinaryFile = (file: Blob) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const loadedFile = reader.result;
            loadedFile ? resolve(loadedFile) : reject();
        };
        reader.readAsDataURL(file);
    });
};