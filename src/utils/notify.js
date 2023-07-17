import { openSnackbarExported } from 'src/components/notifier';

export default function notify(obj) {
    openSnackbarExported({
        notificationMessage: obj.notificationMessage || obj.message || obj.toString(),
    });
}