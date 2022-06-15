function getTiketTemplate(evento, ubicacion, sector, espacio, dia, mes, año, hora, qr, imagenEvento) {
    if (!imagenEvento) imagenEvento = "https://p4.wallpaperbetter.com/wallpaper/482/217/122/5bd02d1907fdc-wallpaper-preview.jpg";
    let html = `<div class="ticket">
    <div class="left">
        <div class="image">
            <div class="ticket-number">
            </div>
        </div>
        <div class="ticket-info">
            <p class="date">
                <span>${dia}</span>
                <span class="june-29">${mes}</span>
                <span>${año}</span>
            </p>
            <div class="show-name">
                <h1>${evento}</h1>
                <h4>${ubicacion}</h4>
            </div>
            <p class="location"><span>${sector}</span>
                <span class="separator"><i class="far fa-smile"></i></span><span>${espacio}</span>
            </p>
        </div>
    </div>
    <div class="right">

        <div class="right-info-container">
            <div class="show-name">
                <h1>Hora</h1>
            </div>
            <div class="time">
                <p>${hora}</p>

            </div>
            <div class="barcode">
                <img src=${qr}
                    alt="QR code">
            </div>
        </div>
    </div>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body,
        html {
            height: 100vh;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            background: #ffffff;
            color: black;
            font-size: 14px;
            letter-spacing: 0.1em;
        }

        .ticket {
            margin: auto;
            display: -webkit-flex;
            display: flex;
            background: white;
            -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
        }

        .left {
            display: -webkit-flex;
        }

        .image {

            background-image: url(${imagenEvento});
            background-size: cover;
            background-repeat: no-repeat !important;
            background-attachment: scroll !important;
            background-position: center center !important;
            z-index: auto;
            background-size: cover !important;
            -webkit-background-size: cover !important;
            -moz-background-size: cover !important;
            -o-background-size: cover !important;
            opacity: 0.85;
        }

        .left .ticket-number {
            height: 250px;
            width: 250px;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: -webkit-flex-end;
            justify-content: flex-end;
            -webkit-align-items: -webkit-flex-end;
            align-items: flex-end;
            padding: 5px;
        }

        .ticket-info {
            padding: 10px 30px;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: column;
            flex-direction: column;
            text-align: center;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            -webkit-align-items: center;
            align-items: center;
        }

        .date {
            border-top: 1px solid gray;
            border-bottom: 1px solid gray;
            padding: 5px 0;
            font-weight: 700;
            display: -webkit-flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: space-around;
            justify-content: space-around;
        }

        .date span {
            width: 100px;
        }

        .date span:first-child {
            text-align: left;
        }

        .date span:last-child {
            text-align: right;
        }

        .date .june-29 {
            color: #d83565;
            font-size: 20px;
        }

        .show-name {
            font-size: 32px;
            font-family: "Nanum Pen Script", cursive;
            color: #d83565;
        }

        .show-name h1 {
            font-size: 48px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #4a437e;
        }

        .time {
            padding: 10px 0;
            color: #4a437e;
            text-align: center;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: column;
            flex-direction: column;
            gap: 10px;
            font-weight: 700;
        }

        .time span {
            font-weight: 400;
            color: gray;
        }

        .left .time {
            font-size: 16px;
        }


        .location {
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-around;
            justify-content: space-around;
            -webkit-align-items: center;
            align-items: center;
            width: 100%;
            padding-top: 8px;
            border-top: 1px solid gray;
        }

        .location .separator {
            font-size: 20px;
        }

        .right {
            width: 180px;
            border-left: 1px dashed #404040;
        }

        .right .admit-one {
            color: darkgray;
        }

        .right .admit-one span:nth-child(2) {
            color: gray;
        }

        .right .right-info-container {
            height: 250px;
            padding: 10px 10px 10px 35px;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: column;
            flex-direction: column;
            -webkit-justify-content: space-around;
            justify-content: space-around;
            -webkit-align-items: center;
            align-items: center;
        }

        .right .show-name h1 {
            font-size: 18px;
        }

        .barcode {
            height: 150px;
        }

        .barcode img {
            height: 100%;
        }

        .right .ticket-number {
            color: gray;
        }
    </style>
</div>`;

    return html;
}

module.exports = {
    getTiketTemplate
}
