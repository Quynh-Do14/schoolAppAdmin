import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'

import Column from 'antd/es/table/Column'
import { PlusOutlined } from '@ant-design/icons'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { ROUTE_PATH } from '../../../core/common/appRouter'
import { useNavigate } from 'react-router-dom';
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'
import Constants from '../../../core/common/constants'
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'
import { TitleTableCommon } from '../../../infrastructure/common/components/text/title-table-common'
import { ActionCommon } from '../../../infrastructure/common/components/action/action-common'
import { ButtonCommon } from '../../../infrastructure/common/components/button/button-common'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'
import courseService from '../../../infrastructure/repositories/course/course.service'

let timeout: any
const ListCourseManagement = () => {
    const [listCourse, setListCourse] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListCourseAsync = async ({ name = "", size = pageSize, page = currentPage, startDate = "", endDate = "" }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
            // startDate: startDate,
            // endDate: endDate,
        }
        try {
            await courseService.getCourse(
                param,
                setLoading
            ).then((res: any) => {
                setListCourse(res)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1, startDate = "", endDate = "") => {
        await onGetListCourseAsync({ name: name, size: size, page: page, startDate: startDate, endDate: endDate });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage, startDate, endDate).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value, startDate, endDate).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1, startDate, endDate).then(_ => { });
    }

    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteUser = async () => {
        setIsDeleteModal(false);
        try {
            await courseService.deleteCourse(
                String(idSelected),
                setLoading
            ).then((res: any) => {
                if (res) {
                    onSearch().then(() => { })
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onNavigate = (id: any) => {
        navigate(`${(ROUTE_PATH.VIEW_COURSE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <ManageLayout breadcrumb={"Quản lý môn học"} title={"Danh sách môn học"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={12}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tên môn học..."
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <ButtonCommon
                            icon={<PlusOutlined />}
                            classColor="green"
                            onClick={() => navigate(ROUTE_PATH.ADD_COURSE_MANAGEMENT)}
                            title={"Thêm mới"} />
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listCourse}
                    pagination={false}
                    className='table-common'
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (currentPage - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Mã"
                                width={'100px'}
                            />
                        }
                        key={"code"}
                        dataIndex={"code"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tên"
                                width={'250px'}
                            />
                        }
                        key={"name"}
                        dataIndex={"name"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Chuyên ngành"
                                width={'250px'}
                            />
                        }
                        key={"majorName"}
                        dataIndex={"majorName"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Tín chỉ"
                                width={'100px'}
                            />
                        }
                        key={"credit"}
                        dataIndex={"credit"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Kì học"
                                width={'100px'}
                            />
                        }
                        key={"semester"}
                        dataIndex={"semester"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Thao tác"
                                width={"60px"}
                            />
                        }
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record: any) => (
                            // <Space
                            //     size="small"
                            // >
                            //     <Dropdown
                            //         trigger={["hover"]}
                            //         placement="bottomRight"
                            //         overlay={listAction(record)}
                            //     >
                            //         <MenuOutlined className="pointer" />
                            //     </Dropdown>
                            // </Space>
                            <ActionCommon
                                onClickDetail={() => onNavigate(record.id)}
                                onClickDelete={() => onOpenModalDelete(record.id)}
                            />
                        )}
                    />
                </Table>
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={total}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                    isClient={true}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa môn học này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa môn học"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteUser}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ListCourseManagement