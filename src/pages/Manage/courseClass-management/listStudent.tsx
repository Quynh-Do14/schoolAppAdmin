import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'
import Column from 'antd/es/table/Column'
import { FullPageLoading } from '../../../infrastructure/common/components/controls/loading'
import { useNavigate, useParams } from 'react-router-dom';
import DialogConfirmCommon from '../../../infrastructure/common/components/modal/dialogConfirm'
import Constants from '../../../core/common/constants'
import ManageLayout from '../../../infrastructure/common/Layouts/Manage-Layout'
import { PaginationCommon } from '../../../infrastructure/common/components/pagination/Pagination'
import { TitleTableCommon } from '../../../infrastructure/common/components/text/title-table-common'
import { InputSearchCommon } from '../../../infrastructure/common/components/input/input-search-common'
import courseClassService from '../../../infrastructure/repositories/courseClass/courseClass.service'
import { ActionEditCommon } from '../../../infrastructure/common/components/action/action-edit-common'
import ModalGradeCommon from '../../../infrastructure/common/components/modal/modalGrade';

let timeout: any
const ListStudentOfCourseClassManagement = () => {
    const [listLesson, setListLesson] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [idSelected, setIdSelected] = useState(null);
    const [recordSelected, setRecordSelected] = useState({});


    const [isGradeModal, setIsGradeModal] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const param = useParams();

    const onGetListLessonAsync = async () => {
        try {
            await courseClassService.getStudentCourseClass(
                String(param.id),
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

    useEffect(() => {
        onGetListLessonAsync().then(_ => { });
    }, [])

    const onOpenModal = async (item: any) => {
        setRecordSelected(item);
        setIsGradeModal(!isGradeModal)
    }

    const onCloseModal = async () => {
        setIsGradeModal(false)
    }
    return (
        <ManageLayout breadcrumb={"Quản lý điểm"} title={"Danh sách điểm"} redirect={""}>

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
                                title="Sinh viên"
                                width={'250px'}
                            />
                        }
                        key={"fullName"}
                        dataIndex={"fullName"}
                    />

                    <Column
                        title={
                            <TitleTableCommon
                                title="Điểm học kì"
                                width={'100px'}
                            />
                        }
                        key={"midtermScore"}
                        dataIndex={"midtermScore"}
                    />

                    <Column
                        title={
                            <TitleTableCommon
                                title="Điểm cuối kì"
                                width={'100px'}
                            />
                        }
                        key={"finalScore"}
                        dataIndex={"finalScore"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Điểm tổng kết"
                                width={'100px'}
                            />
                        }
                        key={"totalScore"}
                        dataIndex={"totalScore"}
                    />
                    <Column
                        title={
                            <TitleTableCommon
                                title="Điểm hệ 4"
                                width={'100px'}
                            />
                        }
                        key={"score"}
                        dataIndex={"score"}
                        render={(val, record: any) => {
                            return (
                                <div>{val || ""} - {record.grade} </div>
                            )
                        }}
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
                            <ActionEditCommon
                                onClickDetail={() => onOpenModal(record)}
                            />
                        )}
                    />
                </Table>
            </div>
            <ModalGradeCommon
                titleCancel={"Đóng"}
                titleOk={"Xác nhận"}
                visible={isGradeModal}
                handleCancel={onCloseModal}
                recordSelected={recordSelected}
                onGetListLessonAsync={onGetListLessonAsync}
            />
            <FullPageLoading isLoading={loading} />
        </ManageLayout >
    )
}

export default ListStudentOfCourseClassManagement