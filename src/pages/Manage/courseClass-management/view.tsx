import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { CourseState } from '../../../core/atoms/course/courseState';
import UploadVideo from '../../../infrastructure/common/components/input/upload-video';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor';
import CheckBoxCommon from '../../../infrastructure/common/components/input/checkbox-common';
import UploadFileCommon from '../../../infrastructure/common/components/input/upload-file';
import scheduleService from '../../../infrastructure/repositories/courseClass/courseClass.service';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import Constants from '../../../core/common/constants';
import InputDateCommon from '../../../infrastructure/common/components/input/input-date';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import { TeacherState } from '../../../core/atoms/teacher/teacherState';
import courseClassService from '../../../infrastructure/repositories/courseClass/courseClass.service';

const ViewCourseClassManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailLesson, setDetailLesson] = useState<any>({});
    const [document, setDocument] = useState(null);
    const [video, setVideo] = useState(null);
    const dataCourseState = useRecoilValue(CourseState).data;
    const dataTeacherState = useRecoilValue(TeacherState).data;

    const [_data, _setData] = useState<any>({});
    const dataLesson = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.LESSON_MANAGEMENT)
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
            await courseClassService.getCourseClassById(
                String(param.id),
                setLoading
            ).then((res) => {
                setDetailLesson(res.schedule)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetCategoryByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailLesson) {
            setDataLesson({
                course_id: detailLesson?.course_id?._id,
                teacher_id: detailLesson?.teacher_id?._id,
                academic_year: detailLesson.academic_year,
                semester: detailLesson.semester,
                start_date: detailLesson.start_date,
                end_date: detailLesson.end_date,
                day_of_week: detailLesson.day_of_week,
                period: detailLesson.period,
                quantity: detailLesson.quantity,
                room: detailLesson.room,
            });
        };
    }, [detailLesson]);

    const onUpdateCategoryAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await courseClassService.updateCourseClass(
                String(param.id),
                {
                    course_id: dataLesson.course_id,
                    teacher_id: dataLesson.teacher_id,
                    academic_year: dataLesson.academic_year,
                    semester: dataLesson.semester,
                    start_date: dataLesson.start_date,
                    end_date: dataLesson.end_date,
                    day_of_week: dataLesson.day_of_week,
                    period: dataLesson.period,
                    quantity: dataLesson.quantity,
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
        <ManageLayout breadcrumb={"Quản lý lớp học phần"} title={"Xem chi tiết"} redirect={ROUTE_PATH.LESSON_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row gutter={[30, 0]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectAPICommon
                                label={"Môn học"}
                                attribute={"course_id"}
                                isRequired={true}
                                dataAttribute={dataLesson.course_id}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={dataCourseState}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectAPICommon
                                label={"Giáo viên"}
                                attribute={"teacher_id"}
                                isRequired={true}
                                dataAttribute={dataLesson.teacher_id}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={dataTeacherState}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectCommon
                                label={"Năm học"}
                                attribute={"academic_year"}
                                isRequired={true}
                                dataAttribute={dataLesson.academic_year}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={Constants.ConfigSelect.Academic.List}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectCommon
                                label={"Kì học"}
                                attribute={"semester"}
                                isRequired={true}
                                dataAttribute={dataLesson.semester}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={Constants.ConfigSelect.Semester.List}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectCommon
                                label={"Thứ"}
                                attribute={"day_of_week"}
                                isRequired={true}
                                dataAttribute={dataLesson.day_of_week}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                listDataOfItem={Constants.ConfigSelect.DayOfWeek.List}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectCommon
                                label={"Tiết học"}
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
                            <InputNumberCommon
                                label={"Số lượng"}
                                attribute={"quantity"}
                                isRequired={true}
                                dataAttribute={dataLesson.quantity}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Ngày bắt đầu"}
                                attribute={"start_date"}
                                isRequired={true}
                                dataAttribute={dataLesson.start_date}
                                setData={setDataLesson}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                disabledToDate={true} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Ngày kết thúc"}
                                attribute={"end_date"}
                                isRequired={true}
                                dataAttribute={dataLesson.end_date}
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

export default ViewCourseClassManagement