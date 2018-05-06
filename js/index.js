const streamApi = "https://wind-bow.glitch.me/twitch-api/streams/";
const channelApi = "https://wind-bow.glitch.me/twitch-api/channels/";
const channels = [
  "freecodecamp",
  "OverwatchLeague",
  "MonsterHunter",
  "towelliee",
  "Slootbag",
  "wraxu",
  "kabajiow",
  "Warcraft",
  "arekkzgaming",
  "finalbosstv",
  "th3jez",
  "naguura",
  "Xivik_"
];

function retrieveStream(twitchChannel) {
  let logo, name, game, status, statusDesc, channelLink;

  let streamchannelUrl = streamApi + twitchChannel + "?callback=?";
  let channelUrl = channelApi + twitchChannel + "?callback=?";

  $.getJSON(streamchannelUrl, function(streamInfo) {
    if (streamInfo.status == "404") {
      game = streamInfo.message;
      status = "offline";
      statusDesc = "";
    } else if (streamInfo.status == "422") {
      game = streamInfo.message;
      status = "offline";
      statusDesc = "";
    } else {
      streamInfo = streamInfo.stream;
      if (streamInfo === null) {
        game = "offline";
        status = "offline";
        statusDesc = "";
        logo =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png";
      } else {
        game = streamInfo.channel.game;
        status = "online";
        statusDesc = ":" + streamInfo.channel.status;
      }
    }

    $.getJSON(channelUrl, function(streamInfo) {
      name = streamInfo.display_name;
      logo = streamInfo.logo;
      channelLink = streamInfo.url;
      if (streamInfo.status == "404") {
        name = twitchChannel;
        channelLink = "#";
        logo =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png";
      } else if (streamInfo.status == "422") {
        name = twitchChannel;
        channelLink = "#";
        logo =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png";
      } else if (logo === null) {
        logo =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png";
      }

      let result =
        "\
      <div class='row' id='" +
        status +
        "'>\
        <div class='col-md-3 col-xs-4'>\
          <span class='logo'><img class='img' src='" +
        logo +
        "'></span>\
          <a href='" +
        channelLink +
        "' target='_blank'>\
            <span class='name text-center'>" +
        name +
        "</span>\
          </a>\
        </div>\
        <div class='col-md-9 col-xs-8 text-center rounded' id='statusdescription'>\
          <span class='game'>" +
        game +
        "</span>\
          <span class='status'>" +
        statusDesc +
        "</span>\
        </div>\
      </div>";

      if (status == "offline") $(".output").append(result);
      else $(".output").prepend(result);
    });
  });
}

$(document).ready(function() {
  channels.forEach(function(channel) {
    retrieveStream(channel);
  });

  $("#all").click(function() {
    let all = $(".output .row");
    all.each(function(index) {
      $(this).css({ display: "block" });
    });
  });

  $("#online").click(function() {
    let online = $(".output .row");
    online.each(function(index) {
      let toggle = $(this).attr("id");
      if (toggle == "online") {
        $(this).css({ display: "block" });
      } else if (toggle == "offline") {
        $(this).css({ display: "none" });
      }
    });
  });

  $("#offline").click(function() {
    let offline = $(".output .row");
    offline.each(function(index) {
      let toggle = $(this).attr("id");
      if (toggle == "online") {
        $(this).css({ display: "none" });
      } else if (toggle == "offline") {
        $(this).css({ display: "block" });
      }
    });
  });
});