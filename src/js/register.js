import { User } from "./User.js";
// Validation --------------------
const checkValidation = (direct) => {
    switch (direct) {
        case "email": {
            const emailRegex = /^[À-ỹĐđ\s]+$/;
            let emailInput = document.querySelector('#email').value;
            if (emailInput == '') {
                document.querySelector('#emailFeedback').innerHTML = 'Hãy nhập email';
                return false;
            } else if (emailRegex.test(emailInput)) {
                document.querySelector('#emailFeedback').innerHTML = 'Không hợp lệ';
                return false;
            } else {
                document.querySelector('#emailFeedback').innerHTML = '';
                return true;
            }
        }
        case "name": {
            const nameRegex = /^[A-Za-zÀ-ỹĐđ\s]+$/;
            let nameInput = document.querySelector('#name').value;
            let nameFeedback = document.querySelector('#nameFeedback');
            if (nameInput == '') {
                nameFeedback.innerHTML = 'Vui lòng nhập Họ tên';
                return false;
            } else if (!nameRegex.test(nameInput)) {
                nameFeedback.innerHTML = 'Họ tên không hợp lệ';
                return false;
            } else {
                nameFeedback.innerHTML = '';
                return true;
            }
        }
        case "phone": {
            const phoneRegex = /^[0-9]+$/;
            let phoneInput = document.querySelector('#phone').value;
            let phoneFeedback = document.querySelector('#phoneFeedback');
            if (phone == '') {
                phoneFeedback.innerHTML = 'Hãy nhập số điện thoại';
                return false;
            } else if (!phoneRegex.test(phoneInput)) {
                phoneFeedback.innerHTML = 'Số điện thoại không hợp lệ';
                return false;
            } else {
                phoneFeedback.innerHTML = '';
                return true;
            }
        }
        case "password":
            return true;
        case "cfmPassword": {
            let cfmPass = document.querySelector('#cfmPassword').value;
            let pw = document.querySelector('#password').value;
            if (cfmPass == '') {
                document.querySelector('#pwFeedback').innerHTML = 'Xác nhận lại mật khẩu';
            } else if (cfmPass !== pw) {
                document.querySelector('#pwFeedback').innerHTML = 'Mật khẩu không khớp';
                return false;
            } else {
                document.querySelector('#pwFeedback').innerHTML = '';
                return true;
            }
        }
    }
}
// Get Array Input for Validation
let arrInput = [];
for (let tagInput of document.querySelectorAll('.tag-input input')) {
    arrInput.push(tagInput.id);
}
// Real time validation
arrInput.forEach((id) => {
    document.querySelector(`#${id}`).addEventListener('input', () => {
        checkValidation(id);
    })
})
const formValidation = () => {
    let isValid = true;
    let arrInput = document.querySelectorAll('.tag-input input');

    arrInput.forEach((input) => {
        let check = checkValidation(input.id);
        if (!check) {
            isValid = false;
        }
    });
    // Validation Radio
    let selectGender = document.querySelector('input[name="gender"]:checked');
    if (!selectGender) {
        document.querySelector('#genderFeedback').innerHTML = 'Vui lòng chọn giới tính';
        isValid = false;
    } else {
        document.querySelector('#genderFeedback').innerHTML = '';
    };

    return isValid;
}
// --------------------
document.querySelector('#btnSubmit').onclick = async (e) => {
    e.preventDefault();

    if (formValidation()) {
        let user = new User();
        let arrUserInput = document.querySelectorAll('.tag-input input, [name="gender"]:checked');
        for (let tag of arrUserInput) {
            let { id, value } = tag;
            if (tag.id != 'male' && tag.id != 'female' && tag.id != 'cfmPassword') {
                user[id] = value;
            } else if (tag.id != 'cfmPassword') {
                user.gender = Boolean(tag.value)
            }

        }
        console.log(user);

        try {
            let postUser = await axios({
                url: 'https://shop.cyberlearn.vn/api/Users/signup',
                method: 'POST',
                data: user
            });
            window.alert('Register thành công');
            document.querySelector('#reg-form').reset();
        } catch (err) {
            console.log('Lỗi: ', err);
        }
    } else console.log(false);
}