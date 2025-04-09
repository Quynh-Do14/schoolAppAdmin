import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "../../../../assets/styles/components/input.css"
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../controls/MessageError';
import { useRecoilValue } from "recoil";
import { TeacherState } from "../../../../core/atoms/teacher/teacherState";

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
}
const InputSelectTeacherCommon = (props: Props) => {
    const {
        dataAttribute,
        setData,
        attribute,
        disabled,
        setValidate,
        validate,
        submittedTime,
        isRequired,
        label
    } = props;
    const dataTeacherState = useRecoilValue(TeacherState).data;

    const [value, setValue] = useState("");

    const onChange = async (val: any) => {
        setValue(val || "");
        setData({
            [attribute]: val
        });
    };

    let labelLower = label.toLowerCase();
    const validateBlur = (isImplicitChange = false) => {
        validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng chọn ${labelLower}` : "");
    };

    const onBlur = () => {
        validateBlur(false);
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute);
        }
        if (typeof dataAttribute == "boolean") {
            setValue(String(dataAttribute))
        }
    }, [dataAttribute]);


    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);
    
    return (
        <div>
            <div className='mb-4 input-common'>
                <div className='title mb-2'>
                    <span>
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </div>
                <div>
                    <Select
                        showSearch
                        allowClear={false}
                        showArrow
                        disabled={disabled}
                        value={value}
                        listHeight={120}
                        onChange={onChange}
                        onBlur={onBlur}
                        placeholder={`Chọn ${label}`}
                        getPopupContainer={trigger => trigger.parentNode}
                        className={`${validate[attribute]?.isError ? "input-error" : ""} w-full text-left`}
                    >
                        {
                            dataTeacherState && dataTeacherState?.length && dataTeacherState?.map((item, index) => {
                                return (
                                    <Select.Option
                                        key={index}
                                        value={item.id}
                                        title={item.user?.name}
                                    >
                                        {item.user?.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                    <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                </div>
            </div>
        </div>
    );
}
export default InputSelectTeacherCommon;