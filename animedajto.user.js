// ==UserScript==
// @name         AnimeDa(jt)o
// @namespace    http://animedao.com
// @version      0.1
// @description  Lets you download videos from animedao
// @author       github.com/tzubertowski
// @include      /https:\/\/animedao(.*)\.(.*)\/.*/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    const getVideoUrl = (videoProvider) => {
        switch (videoProvider) {
            case "CDN":
                return $('.tab-content > #fb').find('.jw-video').attr('src')
                break
            case "Video":
                return $('.tab-content > #video').find('.jw-video').attr('src')
                break
            case "HTML5":
                return $('.tab-content > #html5').find('video > source').attr('src')
                break
            default:
                throw "Video provider isn't supported"
        }
    }
    const renderDownloadButton = (parentElementSelector, videoUrl) => {
        $('#downloadDajto').remove();
        parentElementSelector.append('<a href="' + videoUrl + '" id="downloadDajto"><button class="btn btn-primary">Download</button></a>')
    }

    const handleSourceChange = () => {
        try {
            let videoUrl = getVideoUrl($('#videocontent > ul > li.active > a').html())
            console.log('Video url: ' + videoUrl)
            let buttonGroup = $('#videocontent > center > div.btn-group')
            renderDownloadButton(buttonGroup, videoUrl)
        } catch(err) {
            console.log(err)
        }
    }


    $("#videocontent").click(() => {
        console.log('Source changed')
        handleSourceChange()
    });
    handleSourceChange()
})();