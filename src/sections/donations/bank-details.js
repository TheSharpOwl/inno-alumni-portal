import { useCallback, useState } from 'react';
import {
    Box,
    Card,
    Typography
} from '@mui/material';


const details = [
    {
        title: "Полное наименование",
        value: "Автономная некоммерческая организация высшего образования «Университет Иннополис»"
    },
    {
        title: "Сокращенное наименование",
        value: "АНО ВО «Университет Иннополис»"
    },
    {
        title: "Директор",
        value: "Семенихин Кирилл Владимирович"
    },
    {
        title: "Главный бухгалтер",
        value: "Симонова Лилия Вахитовна"
    },
    {
        title: "ОГРН",
        value: "1121600006142"
    },
    {
        title: "ИНН",
        value: "1655258235"
    },
    {
        title: "КПП",
        value: "161501001"
    },
    {
        title: "ОКПО",
        value: "26762138"
    },
    {
        title: "Адрес местонахождения Организации",
        value: "420500, Республика Татарстан, г\. Иннополис, ул\. Университетская, д\.1"
    },
    {
        title: "Почтовый адрес",
        value: "420500, Республика Татарстан, г\. Иннополис, ул\. Университетская, д\.1"
    },
    {
        title: "Расчетный счет",
        value: "40703810062000000497"
    },
    {
        title: "Банк",
        value: "ОТДЕЛЕНИЕ N8610 СБЕРБАНКА РОССИИ Г\. КАЗАНЬ"
    },
    {
        title: "БИК",
        value: "049205603"
    },
    {
        title: "Корреспондентский счет",
        value: "30101810600000000603"
    },
]

export const BankDetails = () => {

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
        },
        []
    );

    return (
        <div>
            <Card sx={{ mb: 5 }}>
                <Box sx={{ p: 5 }}>
                    <div>
                        {details.map(({ title, value }, i) => (
                            <div key={i}>
                                <Typography
                                    sx={{ mt: 2 }}
                                    variant="h6"
                                    component="h2">{title}:
                                </Typography>
                                <Typography>
                                    {value}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Box>

            </Card>
        </div>
    );
};
