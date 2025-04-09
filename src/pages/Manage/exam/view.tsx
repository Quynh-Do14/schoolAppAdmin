import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { CourseState } from '../../../core/atoms/course/courseState';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import Constants from '../../../core/common/constants';
import InputDateCommon from '../../../infrastructure/common/components/input/input-date';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import { TeacherState } from '../../../core/atoms/teacher/teacherState';
import examService from '../../../infrastructure/repositories/exam/exam.service';
import { convertHourShow, getPeriodFromTimeRange, getPeriodTimeRange } from '../../../infrastructure/helper/helper';
import { CourseClassState } from '../../../core/atoms/courseClass/courseState';

const ViewExamManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailLesson, setDetailLesson] = useState<any>({});
    const dataCourseClasssState = useRecoilValue(CourseClassState).data;

    const [_data, _setData] = useState<any>({});
    const dataLesson = _data;

    const param = useParams();
    const navigate = useNavigate();

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

    const onGetCategoryByIdAsync = async () => {
        try {
            await examService.getExamById(
                String(param.id),
                setLoading
            ).then((res) => {
                setDetailLesson(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetCategoryByIdAsync().then(() => { })
    }, []);

    useEffect(() => {
        if (detailLesson) {
            const { startPeriod, numPeriods } = getPeriodFromTimeRange(detailLesson.startTime, detailLesson.endTime)
            setDataLesson({
                classId: detailLesson.classId,
                examDate: detailLesson.examDate,
                numberPeriod: numPeriods,
                period: startPeriod,
                room: detailLesson.room,

            });
        };
    }, [detailLesson]);

    const onUpdateCategoryAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            const { startTime, endTime } = getPeriodTimeRange(dataLesson.period, dataLesson.numberPeriod)
            await examService.updateExam(
                String(param.id),
                {
                    classesId: dataLesson.classId,
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
    console.log("dataLesson", dataLesson);

    return (
        <ManageLayout breadcrumb={"Quản lý lịch thi"} title={"Xem chi tiết"} redirect={ROUTE_PATH.EXAM_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row gutter={[30, 0]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectAPICommon
                                label={"Lớp học"}
                                attribute={"classId"}
                                isRequired={true}
                                dataAttribute={dataLesson.classId}
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
                </div>
            </div >
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
                            onClick={onUpdateCategoryAsync}
                            classColor="green"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ViewExamManagement