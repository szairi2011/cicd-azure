var request = require('request');

exports.getNewJoiners = async (req,res) => {
    const newjoiners = [
        {
            isFavorite: false,
            name: 'Salha',
            phone: '770-504-2217',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/men/27.jpg',
            email: 'salha@gmail.com',
            interest: 'C++',
        },
        {
            isFavorite: true,
            name: 'Richard Mahoney',
            phone: '423-676-2869',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/men/1.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        },
        {
            isFavorite: false,
            name: 'Donna Price',
            phone: '859-496-2817',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/women/50.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        },
        {
            isFavorite: false,
            name: 'Lisa Landers',
            phone: '901-747-3428',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/women/3.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        },
        {
            isFavorite: false,
            name: 'Terrance Orta',
            phone: '770-504-2217',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/men/27.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        },
        {
            isFavorite: false,
            name: 'Terrance Orta',
            phone: '770-504-2217',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/men/27.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        },
        {
            isFavorite: true,
            name: 'Dorothy H. Spencer',
            phone: '573-394-9254',
            photo: 'https://www.infragistics.com/angular-demos-lob/assets/images/women/67.jpg',
            email: 'ameni@gmail.com',
            interest: 'java',
        }
    ];
    return res.status(200).send(newjoiners);
}
