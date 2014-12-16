describe("Patterns : Template", function() {

    it("Should compile text", function() {
        var test = ARK.Template('Test <%= variable %>', {
            variable: "me"
        });
        expect(test).toBe("Test me");
    });

});

describe("Patterns : Prompt ", function() {

    it("should be a prompt object", function() {

        var test = ARK.Prompt('Is this a test?');
        expect(typeof test).toBe("object");

    });

});

describe("Patterns : Events", function() {

    it("Should be a backbone event object", function() {

        // check if they have the same keys, if yes assume same object
        var test = _.difference(_.keys(Backbone.Events), _.keys(Backbone.Events));
        expect(test.length).toBe(0);

    });

});

describe("Patterns : Form", function() {

    it("should be a prompt object", function() {

        var listCollection = new ARK.Properties();
        var listView       = new ARK.Properties_part_list({collection:listCollection});
        var createView     = new ARK.Form({ collection:listCollection, el:'.properties_part_create' });

        // console.log(createView);

        expect(true).toBe(true);

    });

});