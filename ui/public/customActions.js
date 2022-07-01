module.exports = {
  getOverviewPanel: function (container) {
    console.log(container);
    if (container.image === "redis") {
      return {
        overviewPanel: {
          title: "Overview",
          endpontpoint: "ui/index.html",
          extensionId: "gtardif_demo-extension",
        },
      };
    } else return null;
  },

  getActions: function (image) {
    return {
      name: "myAction",
      func: function (ddClient, image) {
        console.log(image);
        console.log(ddClient);
        console.log(window);

        ddClient.desktopUI.toast.success("Hello!");
      },
    };
  },
};
