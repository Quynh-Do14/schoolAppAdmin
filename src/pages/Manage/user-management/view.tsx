import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import InputSelectCommon from '../../../infrastructure/common/components/input/select-common';
import InputDateCommon from '../../../infrastructure/common/components/input/input-date';
import { convertDateOnly, convertStringToBoolean } from '../../../infrastructure/helper/helper';
import Constants from '../../../core/common/constants';
import UploadImage from '../../../infrastructure/common/components/input/upload-image';
import TextEditorCommon from '../../../infrastructure/common/components/input/text-editor';
import userService from '../../../infrastructure/repositories/user/user.service';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { useRecoilValue } from 'recoil';
import { MajorState } from '../../../core/atoms/major/majorState';

const ViewUserManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [imageUrl, setImageUrl] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [detailTeacher, setDetailTeacher] = useState<any>({});
    const dataMajorState = useRecoilValue(MajorState).data;

    const [_data, _setData] = useState<any>({});
    const dataTeacher = _data;

    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.STUDENT_MANAGEMENT)
    };
    const setDataTeacher = (data: any) => {
        Object.assign(dataTeacher, { ...data });
        _setData({ ...dataTeacher });
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

    const onGetParkingByIdAsync = async () => {
        try {
            await userService.getUserById(
                String(param.id),
                setLoading
            ).then((res) => {
                setDetailTeacher(res)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetParkingByIdAsync().then(() => { })
    }, [])
    useEffect(() => {
        if (detailTeacher) {
            setDataTeacher({
                avatar: detailTeacher.avatar,
                fullName: detailTeacher.fullName,
                dob: convertDateOnly(detailTeacher.dob),
                gender: detailTeacher.gender,
                email: detailTeacher.email,
                phone: detailTeacher.phone,
                address: detailTeacher.address,
                password: detailTeacher.password,
                majorId: detailTeacher.majorId,
            });
        };
    }, [detailTeacher]);

    const onUpdateParking = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await userService.updateUser(
                String(param.id),
                {
                    avatar: avatar,
                    fullName: dataTeacher.fullName,
                    dob: convertDateOnly(dataTeacher.dob),
                    gender: dataTeacher.gender,
                    email: dataTeacher.email,
                    phone: dataTeacher.phone,
                    address: dataTeacher.address,
                    password: dataTeacher.password,
                    roleName: "ROLE_STUDENT",
                    majorId: dataTeacher.majorId,
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
        <ManageLayout breadcrumb={"Quản lý sinh viên"} title={"Thông tin sinh viên"} redirect={ROUTE_PATH.STUDENT_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5} className='border-add flex justify-center'>
                            <div className='legend-title'>Cập nhật ảnh</div>
                            <UploadImage
                                attributeImg={dataTeacher.image}
                                imageUrl={imageUrl}
                                setAvatar={setAvatar}
                                setImageUrl={setImageUrl}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                isRequired={true}
                                attribute={'image'}
                                label={'Ảnh'}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={16} xl={18} xxl={19} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Tên sinh viên"}
                                        attribute={"fullName"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.fullName}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.email}
                                        setData={setDataTeacher}
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
                                        dataAttribute={dataTeacher.majorId}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={dataMajorState}
                                        valueById='id'
                                        valueByName='majorName'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputDateCommon
                                        label={"Ngày sinh"}
                                        attribute={"dob"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.dob}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        disabledToDate={false}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"SĐT"}
                                        attribute={"phone"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.phone}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Địa chỉ"}
                                        attribute={"address"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.address}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Giới tính"}
                                        attribute={"sex"}
                                        isRequired={true}
                                        dataAttribute={dataTeacher.sex}
                                        setData={setDataTeacher}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.Gender.List}
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
                            onClick={onUpdateParking}
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

export default ViewUserManagement