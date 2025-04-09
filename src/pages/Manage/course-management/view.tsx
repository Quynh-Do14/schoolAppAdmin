import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor';
import InputNumberCommon from '../../../infrastructure/common/components/input/input-number';
import courseService from '../../../infrastructure/repositories/course/course.service';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { MajorState } from '../../../core/atoms/major/majorState';

const ViewCourseManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailCourse, setDetailCourse] = useState<any>({});

    const [_data, _setData] = useState<any>({});
    const dataCourse = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.COURSE_MANAGEMENT)
    };
    const setDataCourse = (data: any) => {
        Object.assign(dataCourse, { ...data });
        _setData({ ...dataCourse });
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
    const dataMajorState = useRecoilValue(MajorState).data;

    const onGetCourseByIdAsync = async () => {
        try {
            await courseService.getCourseById(
                String(param.id),
                setLoading
            ).then((res: any) => {
                setDetailCourse(res.course)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetCourseByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailCourse) {
            setDataCourse({
                name: detailCourse.name,
                credit: detailCourse.credit,
                semester: detailCourse.semester,
                majorId: detailCourse.majorId,
            });
        };
    }, [detailCourse]);

    const onUpdateCourseAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await courseService.updateCourse(
                String(param.id),
                {
                    name: dataCourse.name,
                    credit: dataCourse.credit,
                    semester: dataCourse.semester,
                    majorId: dataCourse.majorId,
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
        <ManageLayout breadcrumb={"Quản lý khóa học"} title={"Thông tin khóa học"} redirect={ROUTE_PATH.COURSE_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên môn học"}
                                        attribute={"name"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.name}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Tín chỉ"}
                                        attribute={"credit"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.credit}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Kì học"}
                                        attribute={"semester"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.semester}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectAPICommon
                                        label={"Chuyên ngành"}
                                        attribute={"majorId"}
                                        isRequired={true}
                                        dataAttribute={dataCourse.majorId}
                                        setData={setDataCourse}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={dataMajorState}
                                        valueById={'id'}
                                        valueByName={"majorName"}
                                    />
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
                            classColor="blue"
                            icon={null}
                            title={'Quay lại'}
                        />
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon
                            onClick={onUpdateCourseAsync}
                            classColor="orange"
                            icon={null}
                            title={'Cập nhật'}
                        />
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </ManageLayout>
    )
}

export default ViewCourseManagement