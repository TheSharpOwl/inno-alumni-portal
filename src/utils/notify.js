import { openSnackbarExported } from 'src/components/Notifier';

export default function notify(obj) {
    openSnackbarExported({
        notificationMessage: obj.notificationMessage || obj.message || obj.toString(),
    });
}