import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { ROUTE_PATH } from '../../../core/common/appRouter';
import InputTextCommon from '../../../infrastructure/common/components/input/input-text';
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common';
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { WarningMessage } from '../../../infrastructure/common/components/toast/notificationToast';
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout';
import majorService from '../../../infrastructure/repositories/major/major.service';
import InputSelectAPICommon from '../../../infrastructure/common/components/input/select-api-common';
import { DepartmentState } from '../../../core/atoms/department/departmentState';
import { useRecoilValue } from 'recoil';

const ViewCategoryManagement = () => {
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [detailCategory, setDetailCategory] = useState<any>({});

    const [_data, _setData] = useState<any>({});
    const dataCategory = _data;
    const departmentState = useRecoilValue(DepartmentState).data;
    const param = useParams();
    const navigate = useNavigate();

    const onBack = () => {
        navigate(ROUTE_PATH.MAJOR_MANAGEMENT)
    };
    const setDataCategory = (data: any) => {
        Object.assign(dataCategory, { ...data });
        _setData({ ...dataCategory });
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
            await majorService.getMajorsById(
                String(param.id),
                setLoading
            ).then((res) => {
                setDetailCategory(res)
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
        if (detailCategory) {
            setDataCategory({
                majorName: detailCategory.majorName,
                departmentId: detailCategory.departmentId,

            });
        };
    }, [detailCategory]);

    const onUpdateCategoryAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await majorService.updateMajors(
                String(param.id),
                {
                    majorName: dataCategory.majorName,
                    departmentId: dataCategory.departmentId,
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
        <ManageLayout breadcrumb={"Quản lý chuyên ngành"} title={"Xem chi tiết"} redirect={ROUTE_PATH.MAJOR_MANAGEMENT}>
            <div className='main-page h-full flex-1 overflow-auto bg-white px-4 py-8'>
                <div className='bg-white scroll-auto'>
                    <Row>
                        <Col span={24} className='border-add'>
                            <div className='legend-title'>Cập nhật thông tin</div>
                            <Row gutter={[30, 0]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên chuyên ngành"}
                                        attribute={"majorName"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.majorName}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputSelectAPICommon
                                        label={"Ngành"}
                                        attribute={"departmentId"}
                                        isRequired={true}
                                        dataAttribute={dataCategory.departmentId}
                                        setData={setDataCategory}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={departmentState}
                                        valueById={'id'}
                                        valueByName={"departmentName"}
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

export default ViewCategoryManagement