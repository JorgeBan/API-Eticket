function getTiketTemplate(evento, ubicacion, sector, espacio, dia, mes, año, hora, qr, imagenEvento) {
    if (!imagenEvento) imagenEvento = "https://p4.wallpaperbetter.com/wallpaper/482/217/122/5bd02d1907fdc-wallpaper-preview.jpg";
    console.log("imagenEvento", imagenEvento);
    let html = `<div class="ticket ticket-2">

    <div class="date">
        <span class="day">${dia}</span>
        <span class="month-and-time">${mes} ${año}</br><span class="small">${hora}</span></span>
    </div>

    <div class="artist">
        <span class="name">${evento}</span>
        </br>
    </div>

    <img class="image" src=${qr} align="left"
        alt="">

    <div class="location">
        <span>${ubicacion}</span>
        </br>
        <span class="small"><span>${sector} ${espacio}</span>
    </div>
    

    <style>
        body {
            background-color: #436ea5;
        }

        .image {
            margin-top: 100px;
            width: 140px;
            height: 140px;

        }

        .ticket {
            font-family: sans-serif;

            background-repeat: no-repeat;
            background-position: top;
            background-size: 100%;
            background-color: #04030C;
            width: 700px;
            height: 300px;
            border-radius: 15px;
            -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            display: block;
            margin: 10% auto auto auto;
            color: #fff;
            ;
        }

        .date {
            margin: 15px;
            -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
        }

        .date .day {
            font-size: 80px;
            float: left;
        }

        .date .month-and-time {
            float: left;
            margin: 15px 0 0 0;
            font-weight: bold;
        }

        .artist {
            font-size: 30px;
            margin: 10px 100px 0 40px;
            float: left;
            font-weight: bold;
            -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
        }

        .location {
            float: left;
            margin: -30px 0 0 30px;
            font-size: 25px;
            font-weight: bold;
            -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
        }

        .rip {
            border-right: 8px dotted #436ea5;
            height: 300px;
            position: absolute;
            top: 0;
            left: 530px;
        }

        .cta .buy {
            position: absolute;
            top: 135px;
            right: 15px;
            display: block;
            font-size: 12px;
            font-weight: bold;
            background-color: #436ea5;
            padding: 10px 20px;
            border-radius: 25px;
            color: #fff;
            text-decoration: none;
            -webkit-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            -webkit-filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
            filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
        }

        .small {
            font-weight: 200;
        }

        .ticket-2 {
            background-image: url(${imagenEvento});
        }
    </style>
</div>`;

    return html;
}

module.exports = {
    getTiketTemplate
}
