<template>
    <el-row>
        <el-alert type="info" v-if="api.custom_login_info" title="通知：">{{api.custom_login_info}}</el-alert>

        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <div class="LoginModal-header">
                <img :src="api.custom_logo" class="LoginModal-logoImage">
            </div>
            <div class="LoginModal-alert">{{loginAlert}}</div>
            <el-form-item prop="username">
                <el-input type="text" v-model="form.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="captcha_resp">
                <el-input type="text" v-model="form.captcha_resp" placeholder="验证码" @keyup.enter.native="login('form')">
                    <img slot="append" :src="captcha_image_url" alt="captcha-image" @click="getCaptcha" style="height: 30px">
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="login('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import axios from '../http-common'

    export default {
        name: 'Login',
        data() {
            return {
                loginAlert: '欢迎来到 Ansible Anteater！请登录。',
                api: {
                    custom_login_info: '',
                    custom_logo: ''
                },
                form: {
                    username: '',
                    password: '',
                    captcha_resp: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    captcha_resp: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                captcha_key: '',                
                captcha_image_url: '',
                checked: true
            }
        },
        mounted() {
            this.getApi()
            this.getCaptcha()
        },
        methods: {
            getApi() {
                axios.get('/api/').then((res) => {
                    this.api = res.data
                }).catch((error => {
                   console.log(error)
                }))
            },
            getCaptcha() {
                axios.get('/api/captcha/').then((res) => {
                    this.captcha_key = res.data.key
                    this.captcha_image_url = res.data.image
                    this.form.captcha_resp = ''
                }).catch((error => {
                    console.log(error)
                }))
            },
            login(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        axios.get('/api/login/').then((res) => {
                            let data = res.data
                            let csrfmiddlewaretoken = /name='csrfmiddlewaretoken' value='([0-9a-zA-Z]+)' \//.exec(data)[1];
                            console.log('####csrfmiddlewaretokenValue####', csrfmiddlewaretoken)

                            let loginParams = new URLSearchParams();
                            loginParams.append('username', this.form.username);
                            loginParams.append('password', this.form.password);
                            loginParams.append('csrfmiddlewaretoken', csrfmiddlewaretoken);
                            loginParams.append('next', '/api');
                            loginParams.append('captcha_key', this.captcha_key);
                            loginParams.append('captcha_resp', this.form.captcha_resp);

                            axios.post('/api/login/', loginParams).then((res) => {
                                console.log(res)
                                if (res.status < 400) {
                                    this.$router.push('/')
                                }
                            }).catch((error) => {
                                console.log(error)
                                this.$message({
                                    message: '请输入正确的用户名、密码、验证码。',
                                    type: 'error',
                                    duration: 5000
                                })
                                this.getCaptcha()
                            })
                        }).catch((error) => {
                            console.log(error)
                        })
                    } else {
                        console.log()
                    }
                });
            }
        }
    }

</script>

<style lang="less" scoped>
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
    .LoginModal-header {
        text-align: left;
        background-color: #FFFFFF;
        border-bottom: 0;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }
    .LoginModal-alert {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: normal;
        color: #707070;
        transition: opacity 0.2s;
    }
    .LoginModal-logoImage {
        max-width: 112px;
        margin: 0px 20px 15px 0px;
    }
</style>