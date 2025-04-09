import { Upload } from 'antd';
import { useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { configImageURL, validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';

type Props = {
    label: string,
    attributeImg: any,
    setAvatar: Function,
    imageUrl: any,
    setImageUrl: Function,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    attribute: string,
    isRequired: boolean,
}

const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
function UploadImage(props: Props) {
    const {
        label,
        attributeImg,
        setAvatar,
        imageUrl,
        setImageUrl,
        attribute,
        submittedTime,
        isRequired,
        setValidate,
        validate,
    } = props;

    const inputRef = useRef(null);
    const handleChange = (info: any) => {
        if (info.file) {
            getBase64(info.file, (url: any) => {
                setImageUrl(url);
                setAvatar(info.file);
            });
        }
    };
    useEffect(() => {
        if (attributeImg) {
            setImageUrl((attributeImg))
        }
    }, [attributeImg])

    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !imageUrl, setValidate, validate, !imageUrl ? `Vui lòng tải ${labelLower}` : "");
        }
    };

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <div className="mb-[1rem] relative upload-common">
            <label
                className='cursor-pointer absolute right-0 w-12 h-12 text-center border border-[#4f4d4d] z-10 bg-[#FFFFFF] rounded-full p-2'
                htmlFor="upload"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g data-name="Layer 2">
                        <g data-name="image">
                            <rect width="24" height="24" opacity="0" />
                            <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 5h12a1 1 0 0 1 1 1v8.36l-3.2-2.73a2.77 2.77 0 0 0-3.52 0L5 17.7V6a1 1 0 0 1 1-1zm12 14H6.56l7-5.84a.78.78 0 0 1 .93 0L19 17v1a1 1 0 0 1-1 1z" />
                            <circle cx="8" cy="8.5" r="1.5" />
                        </g>
                    </g>
                </svg>
            </label>
            <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader flex justify-center"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleChange}
                id='upload'
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="avatar" className="w-full h-full rounded-full" />
                ) : (
                    <div ref={inputRef}>
                        <PlusOutlined />
                    </div>
                )}
            </Upload>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    );
}

export default UploadImage;
