import { Dropzone } from 'dropzone';

// la url la exige la librería
export async function dropzoneUpload(uploadImg: Element, upploadBtn: Element): Promise<Dropzone> {
	return new Dropzone(upploadBtn, {
		url: '/falsa',
		autoProcessQueue: false,
	});
}
