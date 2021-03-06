// Compiled using marko@4.14.7 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/tagalong$0.0.1/views/user-profile.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_str = marko_helpers.s,
    marko_escapeXml = marko_helpers.x,
    marko_escapeScript = marko_helpers.xs,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><title></title><link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,user-scalable=no\"></head><body>");

  component_globals_tag({}, out);

  out.w(marko_str(input.view_html) +
    "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/riot/3.13.2/riot.min.js\"></script><script type=\"text/javascript\" src=\"/tags/user-profile.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js\"></script><script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script><script>\n      M.AutoInit();\n\n      let person = \"" +
    marko_escapeScript(input.person) +
    "\";\n\n      $(document).ready(function(){\n        $('.carousel').carousel();\n        $('.collapsible').collapsible();\n      });\n\n    </script><script data-cfasync=\"false\" type=\"text/javascript\" src=\"//p331152.clksite.com/adServe/banners?tid=331152_645035_5&amp;type=shadowbox&amp;size=17\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "13");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/tagalong$0.0.1/views/user-profile.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
