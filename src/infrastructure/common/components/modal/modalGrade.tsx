import { Button, Col, Modal, Row } from 'antd';
import "../../../../assets/styles/components/modal.css"
import { useState } from 'react';
import InputNumberCommon from '../input/input-number';
import gradeService from '../../../repositories/grade/grade.service';
import { WarningMessage } from '../toast/notificationToast';
type Props = {
    titleCancel: string,
    titleOk: string,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
    recordSelected: any
    onGetListLessonAsync: Function
}
const ModalGradeCommon = (props: Props) => {
    const { titleCancel, titleOk, handleCancel, visible, isLoading = false, recordSelected, onGetListLessonAsync } = props;

    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLesson = _data;


    const setDataLesson = (data: any) => {
        Object.assign(dataLesson, { ...data });
        _setData({ ...dataLesson });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGrade = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await gradeService.updateGrade(
                    {
                        "id": recordSelected.gradeId,
                        "midtermScore": dataLesson.midtermScore,
                        "finalScore": dataLesson.finalScore,
                        "studentId": recordSelected.studentId,
                        "courseClassId": recordSelected.classId
                    },
                    setLoading,
                    () => {
                        handleCancel();
                        onGetListLessonAsync();
                    }
                ).then(() => { })
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={false}
                footer={false}
                onCancel={() => handleCancel()}
            >
                <Row>
                    <Col span={24} className='border-add'>
                        <div className='legend-title'>Cập nhật điểm</div>
                        <Row gutter={[30, 0]}>
                            <Col span={24}>
                                <InputNumberCommon
                                    label={"Điểm giữa kì"}
                                    attribute={"midtermScore"}
                                    isRequired={true}
                                    dataAttribute={dataLesson.midtermScore}
                                    setData={setDataLesson}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col span={24}>
                                <InputNumberCommon
                                    label={"Điểm cuối kì"}
                                    attribute={"finalScore"}
                                    isRequired={true}
                                    dataAttribute={dataLesson.finalScore}
                                    setData={setDataLesson}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                        </Row>
                        <div className='modal-common'>
                            <Row justify={"center"} className='py-4'>
                                <Col>
                                    <Button className={"btn-Cancel mx-2"} type='text' key="f-2" onClick={() => handleCancel()}>{titleCancel}</Button>
                                </Col>
                                <Col>
                                    <Button disabled={isLoading} type='text' className={"btn-ok mx-2"} key="f-1" onClick={onGrade}>{titleOk}</Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}
export default ModalGradeCommon;