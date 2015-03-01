var path = require( "path" )
  , logger = require( "logmimosa")
  , sinon = require( "sinon" )
  , utils = require( "../../utils" )
  , buildCommandPath = path.join( process.cwd(), "lib", "command", "build" )
  , buildCommand = require( buildCommandPath )
  ;

describe("Mimosa's build command", function() {

  var loggerGreenSpy
    , loggerBlueSpy
    ;

  before(function() {
    loggerGreenSpy = sinon.spy(logger, "green");
    loggerBlueSpy = sinon.spy(logger, "blue");
  })

  after(function(){
    logger.green.restore();
    logger.blue.restore();
  });

  it("will print help", function( done ) {
    var program = utils.fake.program();
    program.on = function(flag, cb) {
      expect(flag).to.eql("--help");
      cb();
      expect(loggerGreenSpy.callCount).to.be.above(10);
      expect(loggerBlueSpy.callCount).to.be.above(10);
      done()
      return program;
    };
    buildCommand( program );
  });

});
