// 2024-02-18 19:20

const url = $request.url;
const isResp = typeof $response !== "undefined";
let body = $response.body;

switch (isResp) {
  // 草榴社区-评论区广告
  case /^https:\/\/2023\.redircdn\.com\/web\/mob_post\.js\?/.test(url):
    try {
      body = body.replace(/spinit\(\)/g, "rucu6()");
    } catch (err) {
      console.log(`草榴社区-评论区广告, 出现异常: ` + err);
    }
    break;
  // JavDB
  case /^https:\/\/api\.hechuangxinxi\.xyz\/api\/v\d\/\w+/.test(url):
    try {
      let obj = JSON.parse(body);
      if (url.includes("/api/v1/ads")) {
        // 首页banner
        if (obj?.data?.ads?.index_top?.length > 0) {
          // 黑名单 移除http外链
          obj.data.ads.index_top = obj.data.ads.index_top.filter((i) => !/https?:\/\//.test(i?.url));
        }
        if (obj?.data?.ads?.web_magnets_top?.length > 0) {
          // 黑名单 移除http外链
          obj.data.ads.web_magnets_top = obj.data.ads.web_magnets_top.filter((i) => !/https?:\/\//.test(i?.url));
        }
      } else if (url.includes("/api/v1/startup")) {
        // 开屏广告
        if (obj?.data?.splash_ad) {
          obj.data.splash_ad.enabled = false;
          obj.data.splash_ad.overtime = 0;
        }
        if (obj?.data?.feedback) {
          obj.data.feedback = {};
        }
        if (obj?.data?.settings?.NOTICE) {
          delete obj.data.settings.NOTICE;
        }
        if (obj?.data?.user) {
          obj.data.user.vip_expired_at = "2090-12-31T23:59:59.000+08:00";
          obj.data.user.is_vip = true;
        }
      } else if (url.includes("/api/v1/users")) {
        // 伪装会员
        if (obj?.data?.user) {
          obj.data.user.vip_expired_at = "2090-12-31T23:59:59.000+08:00";
          obj.data.user.is_vip = true;
        }
      } else if (url.includes("/api/v4/movies/")) {
        // 详情页banner
        if (obj?.data?.show_vip_banner) {
          obj.data.show_vip_banner = false;
        }
      } else {
        $done({});
      }
      body = JSON.stringify(obj);
    } catch (err) {
      console.log(`JavDB, 出现异常: ` + err);
    }
    break;
  // MISSAV-播放弹窗
  case /^https:\/\/missav\.com\/(dm\d+\/)?\w{2}\/[\w-]+/.test(url):
    try {
      body = body.replace(/if\x20?\(nextDirectUrl\)/g, "if (rucu6)").replace(/htmlAdIndexes\.push/g, "// htmlAdIndexes.push");
    } catch (err) {
      console.log(`MISSAV-播放弹窗, 出现异常: ` + err);
    }
    break;
  default:
    $done({});
}

$done({ body });
