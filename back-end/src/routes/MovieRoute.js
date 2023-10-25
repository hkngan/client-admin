const express = require('express')
const { CHI_TIET_PHIM_DANG_CHIEU, TIM_SUAT_CHIEU, CHI_TIET_PHIM_SAP_CHIEU } = require('../controller/admin/AdminController')
const router = express.Router()

router.get('/detail-nmovie/:id', CHI_TIET_PHIM_DANG_CHIEU)
router.get('/detail-umovie/:id', CHI_TIET_PHIM_SAP_CHIEU)
router.get('/showtime/film', TIM_SUAT_CHIEU);
module.exports = router