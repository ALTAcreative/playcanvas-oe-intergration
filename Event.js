/**
 * Events allow PlayCanvas widget to notify Origami Engine of some state changes,
 * triggering desired response in the container app itself. For these purposes we utilize
 * a standard PlayCanvas event channel, originally designed for communication between scripts.
 * 
 * Attach this script to any entity in your PlayCanvas scene.
 * Come up with your custom event name and specify an optional delay.
 * Then register event handler in Origami Design for your custom event.
 */


var Event = pc.createScript ('Event');


Event.attributes.add ('event', {type: 'string', default: 'something:happened', title: 'Event'});
Event.attributes.add ('delay', {type: 'number', default: 0, title: 'Delay'});


Event.prototype.initialize = function ()
{
    this.executed = false;
    this.time = 0;
};


Event.prototype.update = function (dt)
{
    // the event is fired in a certain number of seconds after widget start
    
    if (!this.executed)
    {
        if (this.time < this.delay)
        {
            this.time += dt;
        }
        else
        {
            this.app.fire (this.event);
            this.executed = true;
        }
    }
};
