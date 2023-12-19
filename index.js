if (!localStorage.getItem("hide_dict")) {
    set_hide_dict({
        "comment_author": [],
        "tucao_author": [],
        "comment_author_dict": {}
    })
}
let global_hide_dict = get_hide_dict()
// comments
comment_add_hide_btn()
hide_comment()
// comments添加屏蔽按钮
function comment_add_hide_btn() {
    let commentlist_li_list = $(".commentlist li")
    for (let index = 0; index < commentlist_li_list.length; index++) {
        let elem = commentlist_li_list.eq(index)
        console.log(elem)
        if(!elem.find(".author").length){
            continue
        }
        let author_id = get_comment_author_id(elem)
        let author_name = get_comment_author_name(elem)
        let hide_btn_html = `
            <span class="comment-report-c">
                <a title="屏蔽内容作者" href="javascript:;" class="hide_comment_author" author-id="${author_id}" author-name="${author_name}">[屏蔽内容作者]</a>
            </span>`
        elem.find(".comment-report-c").before(hide_btn_html)
    }
}
// 隐藏作者被屏蔽的comments
function hide_comment() {
    let commentlist_li_list = $(".commentlist li")
    for (let index = 0; index < commentlist_li_list.length; index++) {
        let elem = commentlist_li_list.eq(index)
        if(!elem.find(".author").length){
            continue
        }
        let author_id = get_comment_author_id(elem)
        if (global_hide_dict.comment_author.indexOf(author_id) != -1) {
            elem.hide()
        }
    }
}
function show_comment() {
    let commentlist_li_list = $(".commentlist li:hidden")
    for (let index = 0; index < commentlist_li_list.length; index++) {
        let elem = commentlist_li_list.eq(index)
        let author_id = get_comment_author_id(elem)
        if (global_hide_dict.comment_author.indexOf(author_id) == -1) {
            elem.show()
        }
    }
}
function get_comment_author_id(elem) {
    return elem.find(".author strong").attr("title").match(/[a-z|A-Z|0-9]+/)[0]
}
function get_comment_author_name(elem) {
    return elem.find(".author strong").text()
}
$(body).on("click", ".hide_comment_author", function () {
    let author_id = $(this).attr("author-id")
    let author_name = $(this).attr("author-name")
    hide_author("comment_author", author_id, author_name)
    hide_comment()
})

// 吐槽
$(body).on("click", ".tucao-btn", function () {
    let comment_elem = $(this).parents("li")
    if (comment_elem.attr("added_tucao_hide_btn")) {
        return false
    }

    let tucao_list_listen_interval = setInterval(() => {
        let tucao_list = comment_elem.find(".tucao-list,tucao-hot")
        if (tucao_list.length > 0) {
            tucao_add_hide_btn(comment_elem)
            hide_tucao(comment_elem)
            clearInterval(tucao_list_listen_interval)
        }
    }, 100);

    comment_elem.attr("added_tucao_hide_btn", true)
})

// 吐槽添加屏蔽按钮
function tucao_add_hide_btn(comment_elem) {
    for (let index = 0; index < comment_elem.find(".tucao-row").length; index++) {
        let tucao_row_elem = comment_elem.find(".tucao-row").eq(index)
        let tucao_author_name = get_tucao_author_name(tucao_row_elem)
        let hide_btn_html = `
            <a href="javascript:;" class="hide_tucao_author" tucao_author_name="${tucao_author_name}">屏蔽吐槽作者</a>
        `
        tucao_row_elem.find(".tucao-report").before(hide_btn_html)
    }
}

// 隐藏作者被屏蔽的吐槽
function hide_tucao(comment_elem = false) {
    let hot_elem = undefined
    let list_elem = undefined
    if (comment_elem) {
        hot_elem = comment_elem.find(".tucao-hot .tucao-row")
        list_elem = comment_elem.find(".tucao-list .tucao-row")
    } else {
        hot_elem = $(".tucao-hot .tucao-row")
        list_elem = $(".tucao-list .tucao-row")
    }

    for (let index = 0; index < hot_elem.length; index++) {
        let elem = hot_elem.eq(index)
        hide_each(elem)
    }
    for (let index = 0; index < list_elem.length; index++) {
        let elem = list_elem.eq(index)
        hide_each(elem)
    }

    function hide_each(elem) {
        let tucao_author_name = get_tucao_author_name(elem)
        if (global_hide_dict.tucao_author.indexOf(tucao_author_name) != -1) {
            elem.hide()
        }
    }
}
function show_tucao() {
    let tucao_list = $(".tucao-row:hidden")
    for (let index = 0; index < tucao_list.length; index++) {
        let elem = tucao_list.eq(index)
        let tucao_author_name = get_tucao_author_name(elem)
        if (global_hide_dict.tucao_author.indexOf(tucao_author_name) == -1) {
            elem.show()
        }
    }
}
function get_tucao_author_name(elem) {
    return elem.find(".tucao-author span").eq(0).text()
}

$(body).on("click", ".hide_tucao_author", function () {
    let tucao_author_name = $(this).attr("tucao_author_name")
    hide_author("tucao_author", tucao_author_name)
    hide_tucao()
})

// 屏蔽库
function set_hide_dict(hide_dict) {
    localStorage.setItem("hide_dict", JSON.stringify(hide_dict))
}
function get_hide_dict() {
    return JSON.parse(localStorage.getItem("hide_dict"))
}
function hide_author(type, author_id, name = false) {
    let hide_dict = get_hide_dict()

    if (hide_dict[type].indexOf(author_id) != -1) {
        return false
    }
    hide_dict[type].push(author_id)
    if (type == "comment_author") {
        hide_dict.comment_author_dict[name] = author_id
    }

    set_hide_dict(hide_dict)
    global_hide_dict = hide_dict

    if (type == "comment_author" && $("#show_hide_comment_author_list").attr('show_flag') == "true") {
        show_hide_comment_author_list()
    }
    if (type == "tucao_author" && $("#show_hide_tucao_author_list").attr('show_flag') == "true") {
        show_hide_tucao_author_list()
    }
}

// 去除屏蔽
$("#sidebar ul").eq(1).after(`
    <ul>
        <h3>Comment作者屏蔽</h3>
        <a id="show_hide_comment_author_list" style="cursor: pointer;" show_flag="false">
            <strong>查看被屏蔽的作者列表</strong>
        </a>
        <div id="hide_comment_author_list"></div>
    </ul>
    <ul>
        <h3>吐槽作者屏蔽</h3>
        <a id="show_hide_tucao_author_list" style="cursor: pointer;">
            <strong>查看被屏蔽的作者列表</strong>
        </a>
        <div id="hide_tucao_author_list"></div>
    </ul>
`)

$("#show_hide_comment_author_list").click(function () {
    if ($(this).attr("show_flag") == "true") {
        hide_hide_comment_author_list()
    } else {
        show_hide_comment_author_list()
    }
})
// 展示屏蔽的comment作者
function show_hide_comment_author_list() {
    let show_btn_elem = $("#show_hide_comment_author_list")
    show_btn_elem.find("strong").text("隐藏被屏蔽的作者列表")
    show_btn_elem.attr("show_flag", true)

    let html = ""
    Object.keys(global_hide_dict.comment_author_dict).forEach(each => {
        let name = each
        let id = global_hide_dict.comment_author_dict[each]
        html += `
        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight: normal;">
            <a class="remove_comment_auth_hide" style="cursor: pointer; font-weight: bold;" author_name="${each}" author_id="${id}">移除屏蔽</a>
            <a>${name}
        </div>
        `
    })
    if (html) {
        $("#hide_comment_author_list").html(html)
    } else {
        $("#hide_comment_author_list").html("空")
    }
}
// 隐藏屏蔽的comment作者
function hide_hide_comment_author_list() {
    let show_btn_elem = $("#show_hide_comment_author_list")
    show_btn_elem.find("strong").text("查看被屏蔽的作者列表")
    show_btn_elem.attr("show_flag", false)

    $("#hide_comment_author_list").html("")
}

$(body).on("click", ".remove_comment_auth_hide", function () {
    let id = $(this).attr("author_id")
    let name = $(this).attr("author_name")

    let hide_dict = get_hide_dict()
    delete hide_dict.comment_author_dict[name]
    hide_dict.comment_author = hide_dict.comment_author.filter(function (item) {
        return item != id
    })
    global_hide_dict = hide_dict
    set_hide_dict(hide_dict)

    show_comment()
    show_hide_comment_author_list()
})


$("#show_hide_tucao_author_list").click(function () {
    if ($(this).attr("show_flag") == "true") {
        hide_hide_tucao_author_list()
    } else {
        show_hide_tucao_author_list()
    }
})
// 展示屏蔽的tucao作者
function show_hide_tucao_author_list() {
    let show_btn_elem = $("#show_hide_tucao_author_list")
    show_btn_elem.find("strong").text("隐藏被屏蔽的作者列表")
    show_btn_elem.attr("show_flag", true)

    let html = ""
    global_hide_dict.tucao_author.forEach(each => {
        let name = each
        html += `
        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight: normal;">
            <a class="remove_tucao_auth_hide" style="cursor: pointer; font-weight: bold;" author_name="${each}">移除屏蔽</a>
            <a>${name}
        </div>
        `
    })
    if (html) {
        $("#hide_tucao_author_list").html(html)
    } else {
        $("#hide_tucao_author_list").html("空")
    }
}
// 隐藏屏蔽的comment作者
function hide_hide_tucao_author_list() {
    let show_btn_elem = $("#show_hide_tucao_author_list")
    show_btn_elem.find("strong").text("查看被屏蔽的作者列表")
    show_btn_elem.attr("show_flag", false)

    $("#hide_tucao_author_list").html("")
}

$(body).on("click", ".remove_tucao_auth_hide", function () {
    let name = $(this).attr("author_name")

    let hide_dict = get_hide_dict()
    hide_dict.tucao_author = hide_dict.tucao_author.filter(function (item) {
        return item != name
    })
    global_hide_dict = hide_dict
    set_hide_dict(hide_dict)

    show_tucao()
    show_hide_tucao_author_list()
})