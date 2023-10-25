const { hashPassword, comparePassword } = require('../../helper/authenticationHelper');
const adminAcc = require('../../model/admin')
const theater = require('../../model/theater')
const rooms = require('../../model/rooms')
const prices = require('../../model/price')
const genre = require('../../model/genres')
const nowplaying = require('../../model/nowplaying')
const upcoming = require('../../model/upcoming')
const showtime = require('../../model/showtime')
const rate = require('../../model/rate')
const user = require('../../model/user')
const city = require('../../model/cities')
const JWT = require('jsonwebtoken')
const fs = require('fs');
const multer = require('multer')
const combo = require('../../model/combo')
var {expressjwt: jwt} = require('express-jwt');

const ADMIN_DANG_KY_CONTROLLER = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(req.body)
        if(!email){
            return res.status(400).send({
                success: false,
                message: "Email is required"
            })
        }
        if(!password || password.length < 6){
            return res.status(400).send({
                success: false,
                message: "Password is required and longer than 6 characters"
            })
        }

        const hashedPassword = await hashPassword(password)


        const admin = await adminAcc({email, password:hashedPassword}).save()
        return  res.status(201).send({
            success: true,
            message: 'Register successfully please login',
            admin
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Register Api",
            error
        })
    }
}

const ADMIN_DANG_NHAP_CONTROLLER = async (req, res) => {
    try {
        const {email, password} = req.body
        //
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please enter email or password"
            })
        }
        const user = await adminAcc.findOne({email})
        if(!user){
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }
        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword){
            return res.status(500).send({
                success: false,
                message: "Wrong password!! Try again"
            })
        }
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        // console.log(token)
        user.password = undefined 
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user,
            token
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login Api",
            error
        })
    }
}
const VERIFY_TOKEN = (req, res, next) => {
    // Lấy token từ header hoặc query parameter hoặc cookie
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No token provided",
      });
    }
  
    // Xác thực và kiểm tra tính hợp lệ của token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Invalid token",
        })
      }
  
      // Token hợp lệ, lưu trữ thông tin user trong request
      req.user = decoded;
  
      // Chuyển tiếp đến middleware hoặc xử lý tiếp theo
      next();
    });
  }
  
const THEM_RAP_CONTROLLER = async (req, res) =>{
    try {
        const newTheater = theater(req.body)
        const saveTheater = await newTheater.save()
        return res.status(200).send({
            success: true,
            message: "Added",
            saveTheater
        })
    } catch (error) {
        console.log("Error DANG_NHAP_CONTROLLER func", error)
    }
}

const THEM_PHONG_CHIEU_CONTROLLER = async (req, res) =>{
    try {
        const newRooms = rooms(req.body)
        const saveRooms = await newRooms.save()
        return res.status(200).send({
            success: true,
            message: "Added!",
            saveRooms
        })
    } catch (error) {
        console.log("Error in THEM_PHONG_CHIEU func", error)
    }
}

const THEM_GIA_VE_CONTROLLER = async (req, res) => {
    try {
        const newPrice = prices(req.body)
        const savePrice = await newPrice.save()
        return res.status(200).send({
            success: true,
            message: "Added!",
            savePrice
        })
    } catch (error) {
        console.log('Error in THEM_GIA_VE_CONTROLLER func', error)
    }
}

const THEM_THE_LOAI_PHIM_CONTROLLER = async (req, res) => {
    try {
        const {id_genre, name} = req.body
        const existGerne = await genre.findOne({id_genre: id_genre})
        if(existGerne){
            return res.status(400).send({
                success: false,
                message: 'The genre is already exist'
            })
        }
        const saveGenre = await genre({id_genre, name}).save()
        return res.status(200).send({
            success: true,
            message: 'Added',
            saveGenre
        })
    } catch (error) {
        console.log('Error in THEM_THE_LOAI_PHIM_CONTROLLER func', error)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, callback) => {  // This should be `callback` instead of `callback`
      callback(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
  
const THEM_PHIM_DANG_CHIEU_CONTROLLER = async (req, res) => {
    try {
    
      const img = req.file.path;  
      const id_movie = req.body.id_movie;
      const name = req.body.movie_name;
      const des = req.body.des;
      const trailer = req.body.trailer;
      const start_date = req.body.start_date;
      const time = req.body.time;
      const rate = req.body.rate; 
      const selectedGenres = req.body.genres;
      console.log(req.body);
      console.log(img);
      if (!img || !id_movie || !name || !des || !trailer || !start_date || !time || !rate || !selectedGenres) {
        return res.status(406).send({
          success: false,
          message: 'Please enter all fields'
        });
      }
  
      const existMovie = await nowplaying.findOne({ id_movie: id_movie });
      if (existMovie) {
        return res.status(400).send({
          exists: true,
        });
      }
  
      const Movie = await new nowplaying({
        img: img,
        id_movie: id_movie,
        movie_name: name,
        des: des,
        trailer: trailer,
        start_date: start_date,
        time: time,
        rate: rate,
        genres: selectedGenres
      });
      const saveMovie = await Movie.save();

      return res.status(200).send({
        success: true,
        message: 'Added!',
        saveMovie
      });
    } catch (error) {
        console.error('Error in THEM_PHIM_CONTROLLER', error);
        return res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
      }
};
const THEM_PHIM_SAP_CHIEU_CONTROLLER = async (req, res) => {
    try {
    
        const img = req.file.path;  
        const id_movie = req.body.id_movie;
        const name = req.body.movie_name;
        const des = req.body.des;
        const trailer = req.body.trailer;
        const start_date = req.body.start_date;
        const time = req.body.time;
        const rate = req.body.rate; 
        const selectedGenres = req.body.genres;
        console.log(req.body);
        console.log(img);
        if (!img || !id_movie || !name || !des || !trailer || !start_date || !time || !rate || !selectedGenres) {
          return res.status(406).send({
            success: false,
            message: 'Please enter all fields'
          });
        }
    
        const existMovie = await upcoming.findOne({ id_movie: id_movie });
        if (existMovie) {
          return res.status(400).send({
            exists: true,
          });
        }
    
        const Movie = await new upcoming({
          img: img,
          id_movie: id_movie,
          movie_name: name,
          des: des,
          trailer: trailer,
          start_date: start_date,
          time: time,
          rate: rate,
          genres: selectedGenres
        });
        const saveMovie = await Movie.save();
  
        return res.status(200).send({
          success: true,
          message: 'Added!',
          saveMovie
        });
      } catch (error) {
          console.error('Error in THEM_PHIM_CONTROLLER', error);
          return res.status(500).send({
            success: false,
            message: 'Internal server error'
          });
        }
};
  
  
const THEM_LICH_CHIEU_PHIM_CONTROLLER = async (req, res) => {
  try {
     
      const selectedMovie = req.body.movie_name;
      const selectedTheater = req.body.theater_name;
      const selectedRoom = req.body.room_name;
      const day = req.body.day;
      const time = req.body.time;
      const selectedPrice = req.body.cost;
      
      console.log(req.body); // Corrected console.log

      if (
          selectedMovie == '' || selectedTheater == '' ||
          selectedRoom == '' || day == '' ||
          time == '' || selectedPrice == ''
      ) {
          return res.status(400).send({
              success: false,
              message: 'Please enter all fields'
          });
      }

      const newshowtime = await new showtime({
        movie_name: selectedMovie,
        theater_name: selectedTheater,
        room_name: selectedRoom, // This should be room_name instead of room
        day: day,
        time: time,
        cost: selectedPrice // This should be cost instead of price
    });
    
      const saveShowtime = await newshowtime.save();
      return res.status(200).send({
          success: true,
          message: 'Added!',
          saveShowtime
      });
  } catch (error) {
      console.log('Error in THEM_LICH_CHIEU_PHIM_CONTROLLER func', error);
      return res.status(500).send({
          success: false,
          message: 'Error in THEM_LICH_CHIEU_PHIM_CONTROLLER func'
      });
  }
};


const THEM_RATE_CONTROLLER = async ( req, res) => {
  try {
    const {id, name} = req.body
    if(!id || !name){
      return res.status(401).send({
        success: false,
        message: "Please enter all fields"
      })
    }
    const existRate = await rate.findOne({id:id})
    if(existRate){
      return res.status(400).send({
        success: false,
        message: 'Already exist'
      })
    }
    const saveRate = await rate({id, name}).save()
    return res.status(200).send({
      success: true,
      message: "Added!!",
      saveRate
    })
  } catch (error) {
    console.error('Error in THEM_RATE_CONTROLLER', error);
        return res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
  }
}


const LAY_THONG_TIN_USER = async(req, res) => {
    try {
        const userList = await user.find()
        // console.log(userList)
        return res.status(200).send({
            success: true,
            message: 'User list: ',
            userList
        })
    } catch (error) {
        console.log('Error in GET_USER_SERVICE func', error)
    }
}

const XOA_USER_CONTROLLER = async (req, res) => {
    try {
      const {id} = req.params
      const usr = await user.findByIdAndDelete({_id: id}) 
      if(!usr){
        return res.status(404).send({
            success: false,
            message: `User not found with ${id}`
        })
      }
      res.status(200).send({
        success: true,
        message: `Deleted user with id: ${id}`
      })
    } catch (error) {
      console.log("Error in XOA_USER_CONTROLLER func", error)
    }
  }
const DANH_SACH_PHIM_DANG_CHIEU = async(req, res) => {
    try {
        const movieList = await nowplaying.find()
        return res.status(200).send({
            success: true,
            message: "Movie list: ",
            movieList
        })
    } catch (error) {
        console.log('Error in GET_MOVIE_LIST_SERVICE func', error)
    }
}
const DANH_SACH_PHIM_SAP_CHIEU = async(req, res) => {
    try {
        const movieList = await upcoming.find()
        return res.status(200).send({
            success: true,
            message: "Movie list: ",
            movieList
        })
    } catch (error) {
        console.log('Error in GET_MOVIE_LIST_SERVICE func', error)
    }
}

const XOA_PHIM_DANG_CHIEU = async(req,res) => {
    try {
        const {id} = req.params
        const movie = await nowplaying.findByIdAndDelete({_id: id})
        if(!movie){
            return res.status(404).send({
                success: false,
                message: `Cannot delete movie with id: ${id}`
            })
        }
        return res.status(200).send({
            success: true,
            message: `Deleted movie with id: ${id}`
        })
    } catch (error) {
        console.log('Error in DELETE_NOWPLAYING_SERVICE func', error)
    }
}

const CAP_NHAT_PHIM_DANG_CHIEU = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await nowplaying.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!movie) {
            return res.status(404).send({
                success: false,
                message: `Cannot find any movie with id: ${id}`
            });
        }
        return res.status(200).send({ 
            success: true,
            message: `Updated movie with id: ${id}`,
            movie
        });
    } catch (error) {
        console.log("Error in CAP_NHAT_PHIM_DANG_CHIEU func", error);
        return res.status(500).send({ 
            success: false,
            message: 'Error in CAP_NHAT_PHIM_DANG_CHIEU func'
        });
    }
}
const CHI_TIET_PHIM_DANG_CHIEU = async (req, res) => {
try {
    const {id} = req.params
    console.log(id)
    const detailMovie = await nowplaying.findOne({_id: id})
    if(!detailMovie){
        return res.status(404).send({
            success: false,
            message: "Movie not found"
        })
    }
    return res.status(200).send({detailMovie})
} catch (error) {
    console.log("Error in CHI_TIET_PHIM func", error);
        return res.status(500).send({ 
            success: false,
            message: 'Error in CHI_TIET_PHIM func'
        });
}
}

const CHI_TIET_PHIM_SAP_CHIEU = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const detailMovie = await upcoming.findOne({_id: id})
        if(!detailMovie){
            return res.status(404).send({
                success: false,
                message: "Movie not found"
            })
        }
        return res.status(200).send({detailMovie})
    } catch (error) {
        console.log("Error in CHI_TIET_PHIM func", error);
            return res.status(500).send({ 
                success: false,
                message: 'Error in CHI_TIET_PHIM func'
            });
    }
    }
const THEM_THANH_PHO = async (req, res) => {
    try {
        const {id, city_name} = req.body
        const existCity = await city.findOne({id: id})
        if(existCity){
            return res.status(401).send({
                success: false,
                message:"City is already exist"
            })
        }
        const saveCity = await city({id, city_name}).save()
        return res.status(200).send({
            success: true,
            message: "Added",
            saveCity
        })
    } catch (error) {
        console.log('Error in THEM_THANH_PHO func', error)
    }
}
const THEM_COMBO = async ( req, res) => {
    try {
      const img = req.file.path;  
      const combo_id = req.body.combo_id;
      const combo_name = req.body.combo_name;
      const des = req.body.des;
      const price = req.body.price;
      
      console.log(req.body);
      console.log(img);
      if (!img || !combo_id || !combo_name || !des || !price) {
        return res.status(406).send({
          success: false,
          message: 'Please enter all fields'
        });
      }
  
      const existCombo = await combo.findOne({ combo_id: combo_id });
      if (existCombo) {
        return res.status(400).send({
          exists: true,
        });
      }
  
      const Combo = await new combo({
        img: img,
        combo_id: combo_id,
        combo_name: combo_name,
        des: des,
        price: price
      });
      const saveCombo = await Combo.save();

      return res.status(200).send({
        success: true,
        message: 'Added!',
        saveCombo
      });
    } catch (error) {
        console.log("Error in THEM_COMBO func", error)
    }
}
const THONG_TIN_COMBO = async (req, res) => {
    try {
        const comboList = await combo.find()
        return res.status(200).send({
            success: true,
            message: "Data: ",
            comboList
        })
    } catch (error) {
        console.log('Error in THONG_TIN_COMBO func', error)
    }
}
const THONG_TIN_RAP_1 = async (req, res) => {
        try {
            const id = req.params.id;
            const theaterList = await theater.find({ id_city: id });
    
            return res.status(200).send({
                success: true,
                message: 'Theater list: ',
                theaterList
            });
        } catch (error) {
            console.log('Error in GET_THEATER_SERVICE func', error);
            return res.status(500).send({
                success: false,
                message: 'Error fetching theaters'
            });
        }
    }
const THONG_TIN_RAP_2 = async (req, res) => {
        try {
            const theaterList = await theater.find();
    
            return res.status(200).send({
                success: true,
                message: 'Theater list: ',
                theaterList
            });
        } catch (error) {
            console.log('Error in GET_THEATER_SERVICE func', error);
            return res.status(500).send({
                success: false,
                message: 'Error fetching theaters'
            });
        }
    }
const THONG_TIN_TP = async(req, res) => {
    try {
        const cityList = await city.find()
        return res.status(200).send({
            message: "Data: ",
            cityList
        })
    } catch (error) {
        console.log('Error in THONG_TIN_TP func', error)
    }
}
const THONG_TIN_PHONG = async(req, res) => {
    try {
        const roomList = await rooms.find()
        return res.status(200).send({
            success: true,
            message: 'Theater list: ',
            roomList
        })
    } catch (error) {
        console.log('Error in GET_THEATER_SERVICE func', error)
    }
}
const GIA_VE = async(req, res) => {
    try {
        const priceList = await prices.find()
        return res.status(200).send({
            success: true,
            message: 'Theater list: ',
            priceList
        })
    } catch (error) {
        console.log('Error in GET_THEATER_SERVICE func', error)
    }
}
const THE_LOAI_PHIM = async(req, res) => {
    try {
        const genreList = await genre.find()
        return res.status(200).send({
            success: true,
            message: 'Theater list: ',
            genreList
        })
    } catch (error) {
        console.log('Error in GET_THEATER_SERVICE func', error)
    }
}
const SUAT_CHIEU = async (req, res) => {
    try {
      const showtimeList = await showtime.find()
      
      return res.status(200).send({
        success: true,
        message: 'Showtime list:',
        showtimeList
      });
    } catch (error) {
      console.log('Error in GET_SHOWTIME_SERVICE function', error);
    }
  };
const TIM_SUAT_CHIEU = async (req, res) => {
    try {
      const { movie_name, theater_name, day } = req.query;
      console.log(req.query)
      const showtimeList = await showtime.find({
        movie_name: movie_name,
        theater_name: theater_name,
        day: day
      });
  
      return res.status(200).send({
        success: true,
        message: 'Showtime list:',
        showtimeList
      });
    } catch (error) {
      console.log('Error in TIM_SUAT_CHIEU function', error);
      return res.status(500).send({
        success: false,
        message: 'Error in TIM_SUAT_CHIEU function'
      });
    }
  };

const XOA_SUAT_CHIEU = async(req,res) => {
    try {
        const {id} = req.params
        const st = await showtime.findByIdAndDelete({_id: id})
        if(!st){
            return res.status(404).send({
                success: false,
                message: `Cannot delete showtime with id: ${id}`
            })
        }
        return res.status(200).send({
            success: true,
            message: `Deleted showtime with id: ${id}`
        })
    } catch (error) {
        console.log('Error in XOA_SUAT_CHIEU func', error)
    }
}
const DANH_GIA = async (req, res) => {
    try {
        const rateList = await rate.find()
        return res.status(200).send({
            success: true,
            message: 'Rate list: ',
            rateList
        })
    } catch (error) {
        console.error('Error in GET_RATE_SERVICE', error);
        return res.status(500).send({
          success: false,
          message: 'Internal server error'
        });
    }
}

module.exports = {
    ADMIN_DANG_KY_CONTROLLER, 
    ADMIN_DANG_NHAP_CONTROLLER, 
    VERIFY_TOKEN,
    THEM_RAP_CONTROLLER, 
    THEM_PHONG_CHIEU_CONTROLLER,
    THEM_GIA_VE_CONTROLLER,
    THEM_THE_LOAI_PHIM_CONTROLLER,
    THEM_PHIM_DANG_CHIEU_CONTROLLER,
    THEM_PHIM_SAP_CHIEU_CONTROLLER,
    THEM_LICH_CHIEU_PHIM_CONTROLLER,
    upload,
    THEM_RATE_CONTROLLER,
    THEM_THANH_PHO,
    LAY_THONG_TIN_USER,
    XOA_USER_CONTROLLER,
    XOA_PHIM_DANG_CHIEU,
    DANH_SACH_PHIM_DANG_CHIEU,
    DANH_SACH_PHIM_SAP_CHIEU,
    CAP_NHAT_PHIM_DANG_CHIEU,
    DANH_GIA,
    THE_LOAI_PHIM,
    THONG_TIN_RAP_1,
    THONG_TIN_RAP_2,
    THONG_TIN_PHONG,
    SUAT_CHIEU,
    XOA_SUAT_CHIEU,
    GIA_VE,
    CHI_TIET_PHIM_DANG_CHIEU,
    CHI_TIET_PHIM_SAP_CHIEU,
    TIM_SUAT_CHIEU,
    THONG_TIN_TP,
    THEM_COMBO,
    THONG_TIN_COMBO
}