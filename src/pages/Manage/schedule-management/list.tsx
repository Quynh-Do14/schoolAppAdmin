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
import scheduleService from '../../../infrastructure/repositories/schedule/schedule.service'

let timeout: any
const ListScheduleManagement = () => {
    const [listLesson, setListLesson] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [idSelected, setIdSelected] = useState(null);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onGetListLessonAsync = async ({ name = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page - 1,
            size: size,
            keyword: name,
        }
        try {
            await scheduleService.getSchedule(
                param,
                setLoading
            ).then((res) => {
                setListLesson(res)
                setTotal(res.totalElements)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (name = "", size = pageSize, page = 1,) => {
        await onGetListLessonAsync({ name: name, size: size, page: page });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, [])
    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value).then(_ => { });
    }
    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1).then(_ => { });
    }

    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteAsync = async () => {
        setIsDeleteModal(false);
        try {
            await scheduleService.deleteSchedule(
                String(idSelected),
                setLoading
            ).then((res) => {
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
        navigate(`${(ROUTE_PATH.VIEW_SCHEDULE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <ManageLayout breadcrumb={"Quản lý lịch học"} title={"Danh sách lịch học"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page mb-2 py-2-5' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={12}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tên lịch học..."
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
                            onClick={() => navigate(ROUTE_PATH.ADD_SCHEDULE_MANAGEMENT)}
                            title={"Thêm mới"} />
                    </Col>
                </Row>
            </div>
            <div className='flex-1 overflow-auto bg-[#FFFFFF] content-page'>
                <Table
                    dataSource={listLesson}
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
                        key={"courseClassId"}
                        dataIndex={"courseClassId"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Môn học"
                                width={'250px'}
                            />
                        }
                        key={"courseName"}
                        dataIndex={"courseName"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Giáo viên"
                                width={'150px'}
                            />
                        }
                        key={"fullName"}
                        dataIndex={"fullName"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Phòng"
                                width={'100px'}
                            />
                        }
                        key={"room"}
                        dataIndex={"room"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Giờ bắt đầu"
                                width={'100px'}
                            />
                        }
                        key={"startTime"}
                        dataIndex={"startTime"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Giờ kết thúc"
                                width={'100px'}
                            />
                        }
                        key={"endTime"}
                        dataIndex={"endTime"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày bắt đầu"
                                width={'100px'}
                            />
                        }
                        key={"date"}
                        dataIndex={"date"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Ngày kết thúc"
                                width={'100px'}
                            />
                        }
                        key={"endDate"}
                        dataIndex={"endDate"}
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
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa bài giảng này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa bài giảng"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteAsync}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ListScheduleManagement