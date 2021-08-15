Hooks.on("init", () => {
    game.settings.register(NAME.ID, "", {
        name: "",
        hint: "",
        scope: "client",
        config: true,
        type: Boolean,
        choices: {
            "a": "Alphabet"
        },
        default: true,
        onChange: () => {}
    });
});

class NAME {
    static ID = ""
    
}
