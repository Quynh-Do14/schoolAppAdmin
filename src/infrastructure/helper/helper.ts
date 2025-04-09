import dayjs from "dayjs";
import moment from "moment";
import Constants from "../../core/common/constants";
const baseURL = process.env.REACT_APP_BASE_URL
export const validateFields = (isImplicitChange = false, key: any, isCheck: any, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const configImageURL = (img: string) => {
    if (img) {
        return `${baseURL}/preview/${img}`
    }
    return ""
}

export const convertStringToBoolean = (value: string) => {
    const booleanValue = value === 'true'; // Chuyển chuỗi 'true' và 'false' về boolean
    return booleanValue
};

export const convertDate = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD hh:mm:ss");
    } return null;

};
export const convertDateShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm:ss DD-MM-YYYY");
    } return null;

};

export const convertHourShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("hh:mm");
    } return '';

};

export const convertDateOnlyShow = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("DD-MM-YYYY");
    } return null;

};

export const convertDateOnly = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DD");
    } return null;

};
export const convertDateBooking = (date: any) => {
    if (date) {
        let dateFormat = new Date(date);
        return moment(dateFormat).format("YYYY-MM-DDThh:mm:ss");
    } return null;
};

export const formatCurrencyVND = (amount: string) => {
    // Định dạng số với phân cách hàng nghìn
    let formattedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedAmount} ₫`;
}
export const configGender = (gender: boolean) => {
    if (gender == Constants.Gender.MALE.value) {
        return Constants.Gender.MALE.position
    }
    else if (gender == Constants.Gender.FEMALE.value) {
        return Constants.Gender.FEMALE.position
    }
}

export const getPeriodTimeRange = (startPeriod = 1, numPeriods = 1) => {
    const totalMinutesPerPeriod = 50; // 45 phút học + 5 phút nghỉ
    const baseHour = 7;
    const baseMinute = 0;

    // Lấy ngày hôm nay theo định dạng yyyy-mm-dd
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // e.g. "2025-04-08"

    const startOffset = (startPeriod - 1) * totalMinutesPerPeriod;
    const endOffset = startOffset + numPeriods * 45 + (numPeriods - 1) * 5;

    const getTime = (offsetMinutes: number) => {
        const hour = baseHour + Math.floor((baseMinute + offsetMinutes) / 60);
        const minute = (baseMinute + offsetMinutes) % 60;
        return { hour, minute };
    };

    const formatTime = (h: number, m: number) =>
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

    const toISOStringTime = (dateStr: string, hour: number, minute: number) =>
        `${dateStr}T${formatTime(hour, minute)}:00`;

    const start = getTime(startOffset);
    const end = getTime(endOffset);

    return {
        startTime: toISOStringTime(dateStr, start.hour, start.minute),
        endTime: toISOStringTime(dateStr, end.hour, end.minute),
    };
};
export const getPeriodFromTimeRange = (startISO: string, endISO: string) => {
    const baseHour = 7;
    const baseMinute = 0;
    const totalMinutesPerPeriod = 50;

    const toMinutes = (iso: string) => {
        const date = new Date(iso);
        return date.getHours() * 60 + date.getMinutes();
    };

    const baseTotalMinutes = baseHour * 60 + baseMinute;

    const startTotalMinutes = toMinutes(startISO) - baseTotalMinutes;
    const endTotalMinutes = toMinutes(endISO) - baseTotalMinutes;

    const startPeriod = Math.floor(startTotalMinutes / totalMinutesPerPeriod) + 1;
    const totalEffectiveMinutes = endTotalMinutes - startTotalMinutes;
    const numPeriods = Math.round((totalEffectiveMinutes + 5) / totalMinutesPerPeriod);

    return {
        startPeriod,
        numPeriods,
    };
};