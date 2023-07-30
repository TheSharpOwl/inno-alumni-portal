import { redirect } from 'next/navigation';
import { openSnackbarExported } from 'src/components/notifier';

export default function notify(obj) {
    if (obj.notificationMessage && obj.notificationMessage.action && obj.notificationMessage.action === "REDIRECT_TO_LOGIN") {
        redirect('/auth/login');
    }
    openSnackbarExported({
        notificationMessage: obj.notificationMessage || obj.message || obj.toString(),
    });
}