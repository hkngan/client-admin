const express = require('express')

const { 
    THEM_RAP_CONTROLLER, 
    THEM_PHONG_CHIEU_CONTROLLER,
    THEM_GIA_VE_CONTROLLER,
    THEM_THE_LOAI_PHIM_CONTROLLER,
    THEM_LICH_CHIEU_PHIM_CONTROLLER,
    VERIFY_TOKEN,
    upload,
    THEM_PHIM_DANG_CHIEU_CONTROLLER,
    THEM_PHIM_SAP_CHIEU_CONTROLLER,
    THEM_RATE_CONTROLLER,
    ADMIN_DANG_KY_CONTROLLER,
    ADMIN_DANG_NHAP_CONTROLLER,
    LAY_THONG_TIN_USER,
    DANH_SACH_PHIM_DANG_CHIEU,
    DANH_SACH_PHIM_SAP_CHIEU,
    GIA_VE,
    THONG_TIN_PHONG,
    THE_LOAI_PHIM,
    SUAT_CHIEU,
    DANH_GIA,
    XOA_USER_CONTROLLER,
    XOA_PHIM_DANG_CHIEU,
    CAP_NHAT_PHIM_DANG_CHIEU,
    XOA_SUAT_CHIEU,
    THEM_THANH_PHO,
    THONG_TIN_TP,
    THONG_TIN_RAP_2,
    THONG_TIN_RAP_1,
    THEM_COMBO,
    THONG_TIN_COMBO
} = require('../controller/admin/AdminController')


const router = express.Router()

router.post('/add-admin', ADMIN_DANG_KY_CONTROLLER)
router.post('/admin-login', ADMIN_DANG_NHAP_CONTROLLER)
router.post('/add-theater', THEM_RAP_CONTROLLER)
router.post('/add-rooms', THEM_PHONG_CHIEU_CONTROLLER)
router.post('/add-prices', THEM_GIA_VE_CONTROLLER)
router.post('/add-genres', THEM_THE_LOAI_PHIM_CONTROLLER)
router.post('/add-nowplaying-movie', upload.single('img'), THEM_PHIM_DANG_CHIEU_CONTROLLER);
router.post('/add-upcoming-movie', upload.single('img'), THEM_PHIM_SAP_CHIEU_CONTROLLER);
router.post('/add-showtime', THEM_LICH_CHIEU_PHIM_CONTROLLER)
router.post('/add-rate', THEM_RATE_CONTROLLER)
router.post('/add-city', THEM_THANH_PHO)
router.post('/add-combo',upload.single('img'), THEM_COMBO)


router.get('/user-list', LAY_THONG_TIN_USER, VERIFY_TOKEN)
router.get('/nowplaying-movie-list', DANH_SACH_PHIM_DANG_CHIEU)
router.get('/upcoming-movie-list', DANH_SACH_PHIM_SAP_CHIEU)
router.get('/theater-list', THONG_TIN_RAP_2)
router.get('/sort-theater/:id', THONG_TIN_RAP_1)
router.get('/combo-list', THONG_TIN_COMBO)


router.get('/price-list', GIA_VE)
router.get('/room-list', THONG_TIN_PHONG)
router.get('/genre-list', THE_LOAI_PHIM)
router.get('/showtime-list', SUAT_CHIEU)
router.get('/rate-list', DANH_GIA)
router.get('/city-list', THONG_TIN_TP)
router.delete('/delete-user/:id', XOA_USER_CONTROLLER)
router.delete('/delete-nowplaying-movie/:id', XOA_PHIM_DANG_CHIEU)
router.delete('/delete-showtime/:id', XOA_SUAT_CHIEU)

router.put('/update-nowplaying-movie/:id', CAP_NHAT_PHIM_DANG_CHIEU)

module.exports = router