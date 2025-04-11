import React from 'react';
import "../../../../assets/styles/components/action.css"
import { Tooltip } from 'antd';
type Props = {
    onClickDetail: Function,
    onClickDelete: Function
    onClickShowMore: Function
}
export const ActionGradeCommon = (props: Props) => {
    const { onClickDetail, onClickDelete, onClickShowMore } = props;
    return (
        <div className='action-common flex justify-between whitespace-nowrap'>

            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Xem điểm"}>
                <div onClick={() => onClickShowMore()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M716.582 133c212.77 0 385.853 173.192 385.853 385.852v110.244c0 116.747-53.138 220.266-135.38 291.042 59.642 7.276 119.284 16.316 178.154 28.774 166.798 35.057 287.956 194.139 287.956 378.245v211.888l-22.49 16.426c-120.937 88.746-367.22 232.393-694.974 232.393-17.309 0-34.837-.44-52.587-1.212-288.727-13.56-507.781-133.174-640.735-231.18L0 1538.934v-211.888c0-184.107 121.268-343.188 288.287-378.245 58.539-12.348 117.85-21.829 177.381-28.994-82.02-70.887-134.938-174.185-134.938-290.712V518.852C330.73 306.192 503.813 133 716.582 133Zm405.917 923.73c-149.931-31.64-304.162-45.751-455.416-41.782-119.173 2.976-239.008 17.087-356.086 41.672-116.307 24.474-200.754 138.245-200.754 270.427v155.774c122.15 85.439 312.54 182.122 558.053 193.698 303.39 14.552 532.035-108.59 654.625-193.808v-155.554c0-132.292-84.336-245.953-200.422-270.427ZM625.08 518.852c-38.695 0-55.342 15.324-82.903 40.68-23.702 21.938-53.909 49.61-101.203 62.398v7.166c0 152.025 123.583 275.608 275.608 275.608 152.026 0 275.61-123.583 275.61-275.608v-45.2c-29.326 23.261-68.242 45.2-127.883 45.2-81.69 0-125.568-40.35-157.648-69.785-27.23-25.245-43.657-40.459-81.58-40.459ZM1842.058 307.66 1920 385.6l-431.713 431.713-235.37-235.37 77.942-77.942 157.428 157.428 353.77-353.771ZM716.582 243.243c-145.3 0-263.481 113.441-273.624 256.206 7.717-5.953 15.545-12.678 24.474-20.946 32.081-29.435 75.958-69.894 157.648-69.894 80.92 0 124.575 40.238 156.326 69.563 27.56 25.356 44.207 40.68 82.903 40.68 37.593 0 53.798-15.103 80.918-40.129 11.025-10.142 22.82-20.946 36.491-30.978-31.64-117.41-137.915-204.502-265.136-204.502Z" />
                        </svg>
                    </div>
                </div>
            </Tooltip>
            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Sửa"}>
                <div onClick={() => onClickDetail()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                        </svg>
                    </div>
                </div>
            </Tooltip>
            <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#666666" }} title={"Xóa"}>
                <div onClick={() => onClickDelete()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                        </svg>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
