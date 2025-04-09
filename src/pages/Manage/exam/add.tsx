import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { CourseState } from '../../../core/atoms/course/courseState';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import Constants from '../../../core/common/constants';
import { TeacherState } from '../../../core/atoms/teacher/teacherState';
import InputDateCommon from '../../../infrastructure/common/components/input/input-date';
import examService from '../../../infrastructure/repositories/exam/exam.service';
import { getPeriodTimeRange } from '../../../infrastructure/helper/helper';
import { CourseClassState } from '../../../core/atoms/courseClass/courseState';

const AddExamxManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const [_data, _setData] = useState<any>({});
    const dataLesson = _data;

    const navigate = useNavigate();

    const dataCourseClasssState = useRecoilValue(CourseClassState).data;

    const onBack = () => {
        navigate(ROUTE_PATH.EXAM_MANAGEMENT)
    };
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

    const onAddLessonAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const { startTime, endTime } = getPeriodTimeRange(dataLesson.period, dataLesson.numberPeriod)
            await examService.addExam({
                classesId: dataLesson.classesId,
                examDate: dataLesson.examDate,
                endTime: endTime,
                startTime: startTime,
                room: dataLesson.room,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <ManageLayout breadcrumb={"Quản lý lịch thi"} title={"Thêm lịch thi"} redirect={ROUTE_PATH.EXAM_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Thêm thông tin mới</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectAPICommon
                                        label={"Lớp học"}
                                        attribute={"classesId"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.classesId}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={dataCourseClasssState}
                                        valueById='id'
                                        valueByName='courseName'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Phòng học"}
                                        attribute={"room"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.room}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ConfigSelect.Room.List}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Tiết bắt đầu"}
                                        attribute={"period"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.period}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ConfigSelect.Period.List}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Số tiết"}
                                        attribute={"numberPeriod"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.numberPeriod}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày thi"}
                                        attribute={"examDate"}
                                        isRequired={true}
                                        dataAttribute={dataLesson.examDate}
                                        setData={setDataLesson}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={true} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col'>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onBack}
                            classColor="black"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onAddLessonAsync}
                            classColor="green"
                            icon={null}
                            title={'Thêm mới'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default AddExamxManagement